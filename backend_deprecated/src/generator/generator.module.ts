import { Module } from '@nestjs/common';
import { GeneratorService } from './generator.service';
import { GeneratorController } from './generator.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account, Adlib } from 'src/data-model';
import { OpenaiModule } from 'src/vendors/openai/openai.module';
import { AdlibValidator } from 'src/common/validators/adlib-validator/adlib-validator';

@Module({
  imports: [TypeOrmModule.forFeature([Account, Adlib]), OpenaiModule],
  controllers: [GeneratorController],
  providers: [GeneratorService, AdlibValidator],
})
export class GeneratorModule {}
