import { Module } from '@nestjs/common';
import { AdlibService } from './adlib.service';
import { AdlibController } from './adlib.controller';

@Module({
  controllers: [AdlibController],
  providers: [AdlibService]
})
export class AdlibModule {}
