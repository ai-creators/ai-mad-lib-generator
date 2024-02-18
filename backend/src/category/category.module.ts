import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Adlib, Category } from 'src/data-model/entities';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { AdlibService } from 'src/adlib/adlib.service';

@Module({
  imports: [TypeOrmModule.forFeature([Adlib, Category])],
  controllers: [CategoryController],
  providers: [CategoryService, AdlibService],
})
export class CategoryModule {}
