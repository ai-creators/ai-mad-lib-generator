import { Module } from '@nestjs/common';
import { AdlibResponseService } from './adlib-response.service';
import { AdlibResponseController } from './adlib-response.controller';

@Module({
  controllers: [AdlibResponseController],
  providers: [AdlibResponseService],
})
export class AdlibResponseModule {}
