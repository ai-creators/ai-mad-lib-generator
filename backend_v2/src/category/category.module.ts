import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Adlib, Category } from 'src/data-model';
import { AdlibService } from 'src/adlib/adlib.service';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Adlib])],
  controllers: [CategoryController],
  providers: [CategoryService, AdlibService],
})
export class CategoryModule {}
