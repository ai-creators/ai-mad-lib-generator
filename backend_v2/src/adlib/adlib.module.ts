import { Module } from '@nestjs/common';
import { AdlibController } from './controllers/adlib/adlib.controller';
import { AdlibService } from './services/adlib/adlib.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Adlib, AdlibSchema } from 'src/database/schemas/adlib.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Adlib.name, schema: AdlibSchema }]),
  ],
  controllers: [AdlibController],
  providers: [AdlibService],
})
export class AdlibModule {}
