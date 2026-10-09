import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RiderModule } from './rider/rider.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    // 🔥 PostgreSQL Connection
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433, // ⚠️ make sure PostgreSQL is running on this port
      username: 'postgres',
      password: 'Ka622372',
      database: 'riderDB',
      autoLoadEntities: true,
      synchronize: true, // ✅ auto create tables
    }),

    // 🔐 Auth first (recommended)
    AuthModule,

    // 🚴 Rider module
    RiderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}