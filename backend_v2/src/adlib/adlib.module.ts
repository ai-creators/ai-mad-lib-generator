import { Module } from '@nestjs/common';
import { AdlibService } from './adlib.service';
import { AdlibController } from './adlib.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account, Adlib, Category } from 'src/data-model';

@Module({
  imports: [TypeOrmModule.forFeature([Adlib, Category, Account])],
  controllers: [AdlibController],
  providers: [AdlibService],
})
export class AdlibModule {}
