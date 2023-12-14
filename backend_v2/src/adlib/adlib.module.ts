import { Module } from '@nestjs/common';
import { AdlibController } from './controllers/adlib/adlib.controller';
import { AdlibService } from './services/adlib/adlib.service';

@Module({
  controllers: [AdlibController],
  providers: [AdlibService],
})
export class AdlibModule {}
