import { Module } from '@nestjs/common';
import { AdlibService } from './adlib.service';
import { AdlibController } from './adlib.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account, Adlib, Category } from 'src/data-model';
import { CategoryService } from 'src/category/category.service';
import { AccountService } from 'src/account/account.service';

@Module({
  imports: [TypeOrmModule.forFeature([Adlib, Category, Account])],
  controllers: [AdlibController],
  providers: [AdlibService, CategoryService, AccountService],
})
export class AdlibModule {}
