import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_ACCESS_SECRET ?? 'change-me-access',
    });
  }

  validate(payload: { sub: string; username: string; role: string; clientId: string | null }) {
    return {
      id: payload.sub,
      username: payload.username,
      role: payload.role,
      clientId: payload.clientId,
    };
  }
}
