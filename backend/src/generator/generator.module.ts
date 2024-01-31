import { Module } from '@nestjs/common';
import { GeneratorService } from './generator.service';
import { GeneratorController } from './generator.controller';
import { OpenaiModule } from 'src/vendors/openai/openai.module';
import { AdlibValidator } from 'src/adlib/adlib-validator/adlib-validator';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Adlib, Category } from 'src/data-model/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Adlib, Category]), OpenaiModule],
  controllers: [GeneratorController],
  providers: [GeneratorService, AdlibValidator],
})
export class GeneratorModule {}
