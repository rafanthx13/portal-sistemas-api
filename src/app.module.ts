import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { StatusModule } from './status/status.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { User } from './users/entities/user.entity';
import { SystemsModule } from './systems/systems.module';
import { System } from './systems/entities/system.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: join(__dirname, '..', 'database.sqlite'),
      entities: [User, System],
      synchronize: process.env.NODE_ENV !== 'production',
    }),
    StatusModule,
    UsersModule,
    AuthModule,
    SystemsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
