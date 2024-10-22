import { Injectable, Module } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class OpenaiService {
  constructor(openai: OpenAI) {}
}

@Module({})
export class OpenaiModule {}
