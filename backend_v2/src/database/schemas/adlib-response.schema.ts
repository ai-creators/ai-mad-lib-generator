import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AdlibResponseDocument = HydratedDocument<AdlibResponse>;
export type AdLibResponseQuestionDocument =
  HydratedDocument<AdLibResponseQuestion>;

@Schema({ _id: false })
export class AdLibResponseQuestion {
  @Prop({ required: true })
  question: string;

  @Prop({ required: true })
  answer: string;
}

@Schema({ timestamps: true })
export class AdlibResponse {
  @Prop({ required: true })
  adlibId: String;

  @Prop({ required: true })
  questions: AdLibResponseQuestion[];
}

export const AdlibResponseSchema = SchemaFactory.createForClass(AdlibResponse);
