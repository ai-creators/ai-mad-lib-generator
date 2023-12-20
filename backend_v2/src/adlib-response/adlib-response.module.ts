import { Module } from '@nestjs/common';
import { AdlibResponseService } from './adlib-response.service';
import { AdlibResponseController } from './adlib-response.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdlibResponse } from 'src/data-model/entities/adlib-response.entity';
import { Adlib } from 'src/data-model';
import { AdlibService } from 'src/adlib/adlib.service';

@Module({
  imports: [TypeOrmModule.forFeature([AdlibResponse, Adlib])],
  controllers: [AdlibResponseController],
  providers: [AdlibResponseService, AdlibService],
})
export class AdlibResponseModule {}
