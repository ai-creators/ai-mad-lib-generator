import { Module } from '@nestjs/common';
import { OpenaiService } from './openai.service';
import { OpenaiModelTypes } from './openai-model-types';
import OpenAI from 'openai';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Adlib } from 'src/data-model/entities/adlib.schema';

@Module({
  imports: [TypeOrmModule.forFeature([Adlib])],
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
