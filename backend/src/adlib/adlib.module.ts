import { Module } from '@nestjs/common';
import { AdlibService } from './adlib.service';
import { AdlibController } from './adlib.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Adlib, AdlibSchema } from 'src/data-model/entities/adlib.schema';
import { AdlibValidator } from './adlib-validator/adlib-validator';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Adlib.name, schema: AdlibSchema }]),
    AdlibValidator,
  ],
  controllers: [AdlibController],
  providers: [AdlibService],
})
export class AdlibModule {}
