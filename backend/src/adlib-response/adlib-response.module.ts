import { Module } from '@nestjs/common';
import { AdlibResponseService } from './adlib-response.service';
import { AdlibResponseController } from './adlib-response.controller';
import { AdlibService } from 'src/adlib/adlib.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Adlib, AdlibResponse } from 'src/data-model/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Adlib, AdlibResponse])],
  controllers: [AdlibResponseController],
  providers: [AdlibResponseService, AdlibService],
})
export class AdlibResponseModule {}
