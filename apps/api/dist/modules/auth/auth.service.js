var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import argon2 from 'argon2';
import prismaPackage from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service.js';
const { UserRole } = prismaPackage;
let AuthService = class AuthService {
    prisma;
    jwtService;
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async login(body) {
        const user = await this.prisma.user.findUnique({
            where: { username: body.username },
        });
        if (!user || !user.isActive) {
            throw new UnauthorizedException('Invalid username or password.');
        }
        const matches = await argon2.verify(user.passwordHash, body.password);
        if (!matches) {
            throw new UnauthorizedException('Invalid username or password.');
        }
        return this.issueTokens(user);
    }
    async refresh(refreshToken) {
        try {
            const payload = await this.jwtService.verifyAsync(refreshToken, {
                secret: process.env.JWT_REFRESH_SECRET,
            });
            const user = await this.prisma.user.findUnique({
                where: { id: BigInt(payload.sub) },
            });
            if (!user || !user.isActive) {
                throw new UnauthorizedException('Invalid refresh token.');
            }
            return this.issueTokens(user);
        }
        catch {
            throw new UnauthorizedException('Invalid refresh token.');
        }
    }
    async issueTokens(user) {
        const sessionUser = {
            id: user.id.toString(),
            username: user.username,
            name: user.fullName,
            email: user.email,
            role: user.role,
            clientId: user.clientId?.toString() ?? null,
        };
        const accessToken = await this.jwtService.signAsync({ sub: sessionUser.id, username: sessionUser.username, role: sessionUser.role, clientId: sessionUser.clientId }, {
            secret: process.env.JWT_ACCESS_SECRET,
            expiresIn: process.env.JWT_ACCESS_TTL ?? '15m',
        });
        const refreshToken = await this.jwtService.signAsync({ sub: sessionUser.id, username: sessionUser.username }, {
            secret: process.env.JWT_REFRESH_SECRET,
            expiresIn: process.env.JWT_REFRESH_TTL ?? '7d',
        });
        return {
            accessToken,
            refreshToken,
            user: sessionUser,
        };
    }
};
AuthService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService,
        JwtService])
], AuthService);
export { AuthService };
