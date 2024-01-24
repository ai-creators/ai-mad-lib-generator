import { Module } from '@nestjs/common';
import { AdlibService } from './adlib.service';
import { AdlibController } from './adlib.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Adlib, AdlibSchema } from 'src/data-model/entities/adlib.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Adlib.name, schema: AdlibSchema }]),
  ],
  controllers: [AdlibController],
  providers: [AdlibService],
})
export class AdlibModule {}
