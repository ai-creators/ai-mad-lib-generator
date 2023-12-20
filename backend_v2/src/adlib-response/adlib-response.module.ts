import { Module } from '@nestjs/common';
import { AdlibResponseService } from './adlib-response.service';
import { AdlibResponseController } from './adlib-response.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdlibResponse } from 'src/data-model/entities/adlib-response.entity';
import { Account, Adlib } from 'src/data-model';
import { AdlibService } from 'src/adlib/adlib.service';
import { AccountService } from 'src/account/account.service';

@Module({
  imports: [TypeOrmModule.forFeature([AdlibResponse, Adlib, Account])],
  controllers: [AdlibResponseController],
  providers: [AdlibResponseService, AdlibService, AccountService],
})
export class AdlibResponseModule {}
