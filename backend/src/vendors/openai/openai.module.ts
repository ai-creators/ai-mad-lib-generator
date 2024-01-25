import { Module } from '@nestjs/common';
import { OpenaiService } from './openai.service';
import { OpenaiModelTypes } from './openai-model-types';
import OpenAI from 'openai';
import { Adlib, AdlibSchema } from 'src/data-model/entities/adlib.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Adlib.name, schema: AdlibSchema }]),
  ],
  providers: [
    {
      provide: OpenaiService,
      useFactory: async () => {
        const apiKey = process.env.OPENAI_API_KEY;

        return new OpenaiService(
          new OpenAI({ apiKey }),
          OpenaiModelTypes.GPT_3_TURBO,
        );
      },
      inject: [],
    },
  ],
  exports: [OpenaiService],
})
export class OpenaiModule {}
