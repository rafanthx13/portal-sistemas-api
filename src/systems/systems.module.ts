import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemsService } from './systems.service';
import { SystemsController } from './systems.controller';
import { System } from './entities/system.entity';

@Module({
  imports: [TypeOrmModule.forFeature([System])],
  controllers: [SystemsController],
  providers: [SystemsService],
  exports: [SystemsService],
})
export class SystemsModule {}
