import { Module } from '@nestjs/common';
import { AdlibController } from './controllers/adlib/adlib.controller';
import { AdlibService } from './services/adlib/adlib.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Adlib, AdlibSchema } from 'src/database/schemas/adlib.schema';
import {
  AdlibFeature,
  AdlibFeatureSchema,
} from 'src/database/schemas/adlib-feature.schema';
import { AdlibResponseService } from './services/adlib-response/adlib-response.service';
import {
  AdlibResponse,
  AdlibResponseSchema,
} from 'src/database/schemas/adlib-response.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Adlib.name, schema: AdlibSchema },
      { name: AdlibFeature.name, schema: AdlibFeatureSchema },
      { name: AdlibResponse.name, schema: AdlibResponseSchema },
    ]),
  ],
  controllers: [AdlibController],
  providers: [AdlibService, AdlibResponseService],
})
export class AdlibModule {}
