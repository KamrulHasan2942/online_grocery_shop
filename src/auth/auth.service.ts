import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';

import { Rider } from '../rider/rider.entity';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(Rider)
    private riderRepo: Repository<Rider>,

    private jwtService: JwtService,
  ) {}

  async login(data: any) {

    const user =
      await this.riderRepo.findOne({
        where: {
          email: data.email,
        },
      });

    if (!user) {
      throw new UnauthorizedException(
        'User not found',
      );
    }

    const isMatch =
      await bcrypt.compare(
        data.password,
        user.password,
      );

    if (!isMatch) {
      throw new UnauthorizedException(
        'Invalid credentials',
      );
    }

    const payload = {
      id: user.id,
      email: user.email,
    };

    return {
      message: 'Login Successful',

      access_token:
        this.jwtService.sign(payload),

      riderId: user.id,
    };
  }
}