import { Module } from '@nestjs/common';
import { AdlibService } from './adlib.service';
import { AdlibController } from './adlib.controller';
import { AdlibValidator } from './adlib-validator/adlib-validator';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Adlib } from 'src/data-model/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Adlib]), AdlibValidator],
  controllers: [AdlibController],
  providers: [AdlibService],
})
export class AdlibModule {}
