import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { RiderController } from './rider.controller';
import { RiderService } from './rider.service';
import { Rider } from './rider.entity';
import { Order } from './order.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Rider, Order]),

    // 🔐 ADD THIS (VERY IMPORTANT)
    JwtModule.register({
      secret: 'secretKey123',
    }),
  ],
  controllers: [RiderController],
  providers: [RiderService],
  exports: [RiderService],
})
export class RiderModule {}