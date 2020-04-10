import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import keys from '../localconfig/keys';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(req) => {
        var token = null;
        if (req && req.cookies) {
          token = req.cookies['jwt']
        }
        return token;
      }]),
      ignoreExpiration: false,
      secretOrKey: keys.cryptConsts.secret,
    });
  }

  async validate(payload: any) {
    console.log("jwt payload:", payload);
    return { userId: payload.sub, username: payload.username, role: payload.role };
  }
}