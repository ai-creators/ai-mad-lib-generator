import { Module } from '@nestjs/common';
import { GeneratorService } from './generator.service';
import { GeneratorController } from './generator.controller';
import { Adlib, AdlibSchema } from 'src/data-model/entities/adlib.schema';
import { OpenaiModule } from 'src/vendors/openai/openai.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AdlibValidator } from 'src/adlib/adlib-validator/adlib-validator';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Adlib.name, schema: AdlibSchema }]),
    OpenaiModule,
  ],
  controllers: [GeneratorController],
  providers: [GeneratorService, AdlibValidator],
})
export class GeneratorModule {}
