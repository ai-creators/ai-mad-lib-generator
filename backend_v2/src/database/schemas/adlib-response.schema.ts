import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AdlibResponseDocument = HydratedDocument<AdlibResponse>;

@Schema()
export class IAdLibResponseQuestion {
  @Prop({ required: true })
  question: string;

  @Prop({ required: true })
  answer: string;
}

@Schema({ timestamps: true })
export class AdlibResponse {
  @Prop({ required: true })
  adlibId: String;

  @Prop({ type: [IAdLibResponseQuestion], required: true })
  questions: IAdLibResponseQuestion[];
}

export const AdlibResponseSchema = SchemaFactory.createForClass(AdlibResponse);
