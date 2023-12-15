import { Module } from '@nestjs/common';
import { GeneratorService } from './generator.service';
import { GeneratorController } from './generator.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account, Adlib } from 'src/data-model';
import { OpenaiModule } from 'src/vendors/openai/openai.module';

@Module({
  imports: [TypeOrmModule.forFeature([Account, Adlib]), OpenaiModule],
  controllers: [GeneratorController],
  providers: [GeneratorService],
})
export class GeneratorModule {}
