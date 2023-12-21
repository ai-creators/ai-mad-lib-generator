import { Module } from '@nestjs/common';
import { AdlibService } from './adlib.service';
import { AdlibController } from './adlib.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account, Adlib, Category } from 'src/data-model';
import { CategoryService } from 'src/category/category.service';

@Module({
  imports: [TypeOrmModule.forFeature([Adlib, Category, Account])],
  controllers: [AdlibController],
  providers: [AdlibService, CategoryService],
})
export class AdlibModule {}
