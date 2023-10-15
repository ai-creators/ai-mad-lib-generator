import { Module } from '@nestjs/common';
import { GeneratorController } from './controllers/generator/generator.controller';
import { GeneratorService } from './services/generator/generator.service';
import { OpenaiService } from 'src/vendors/openai/services/openai/openai.service';
import { AdlibService } from './services/adlib/adlib.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Adlib, AdlibSchema } from 'src/database/schemas/adlib.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Adlib.name, schema: AdlibSchema }]),
  ],
  controllers: [GeneratorController],
  providers: [GeneratorService, OpenaiService, AdlibService],
})
export class GeneratorModule {}
