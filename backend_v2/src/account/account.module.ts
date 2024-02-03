import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from '../data-model/entities/account.entity';
import { Adlib } from 'src/data-model';
import { AdlibResponse } from 'src/data-model/entities/adlib-response.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Account, Adlib, AdlibResponse])],
  controllers: [AccountController],
  providers: [AccountService, Adlib, AdlibResponse],
})
export class AccountModule {}
