import { Module } from '@nestjs/common';
import { GeneratorService } from './generator.service';
import { GeneratorController } from './generator.controller';

@Module({
  controllers: [GeneratorController],
  providers: [GeneratorService]
})
export class GeneratorModule {}
