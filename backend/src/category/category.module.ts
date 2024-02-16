import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Adlib, Category } from 'src/data-model/entities';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

@Module({
  imports: [TypeOrmModule.forFeature([Adlib, Category])],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
