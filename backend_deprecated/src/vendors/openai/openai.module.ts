import { Module } from '@nestjs/common';
import { OpenaiService } from './openai.service';
import { OpenaiModelTypes } from './openai-model-types';
import { OpenaiCrudService } from './openai-crud.service';
import OpenAI from 'openai';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/data-model';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  providers: [
    {
      provide: OpenaiService,
      useFactory: async (openaiCrudService: OpenaiCrudService) => {
        const apiKey = process.env.OPENAI_API_KEY;

        return new OpenaiService(
          new OpenAI({ apiKey }),
          OpenaiModelTypes.GPT_3_TURBO,
          openaiCrudService,
        );
      },
      inject: [OpenaiCrudService],
    },
    OpenaiCrudService,
  ],
  exports: [OpenaiService],
})
export class OpenaiModule {}
