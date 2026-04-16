import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import argon2 from 'argon2';
import prismaPackage from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service.js';
import { LoginDto } from './dto/login.dto.js';

const { UserRole } = prismaPackage;

type SessionUser = {
  id: bigint;
  username: string;
  fullName: string;
  email: string;
  role: (typeof UserRole)[keyof typeof UserRole];
  clientId: bigint | null;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(body: LoginDto) {
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

  async refresh(refreshToken: string) {
    try {
      const payload = await this.jwtService.verifyAsync<{ sub: string; username: string }>(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });

      const user = await this.prisma.user.findUnique({
        where: { id: BigInt(payload.sub) },
      });

      if (!user || !user.isActive) {
        throw new UnauthorizedException('Invalid refresh token.');
      }

      return this.issueTokens(user);
    } catch {
      throw new UnauthorizedException('Invalid refresh token.');
    }
  }

  async issueTokens(user: SessionUser) {
    const sessionUser = {
      id: user.id.toString(),
      username: user.username,
      name: user.fullName,
      email: user.email,
      role: user.role,
      clientId: user.clientId?.toString() ?? null,
    };

    const accessToken = await this.jwtService.signAsync(
      { sub: sessionUser.id, username: sessionUser.username, role: sessionUser.role, clientId: sessionUser.clientId },
      {
        secret: process.env.JWT_ACCESS_SECRET,
        expiresIn: process.env.JWT_ACCESS_TTL ?? '15m',
      } as never,
    );

    const refreshToken = await this.jwtService.signAsync(
      { sub: sessionUser.id, username: sessionUser.username },
      {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: process.env.JWT_REFRESH_TTL ?? '7d',
      } as never,
    );

    return {
      accessToken,
      refreshToken,
      user: sessionUser,
    };
  }
}
