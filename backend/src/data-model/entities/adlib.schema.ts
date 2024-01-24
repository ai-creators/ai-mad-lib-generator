import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AdlibDocument = HydratedDocument<Adlib>;

@Schema()
export class Adlib {
  @Prop({ required: true, length: 100 })
  prompt: string;

  @Prop()
  body: string;

  @Prop({ default: false })
  isHidden: boolean;

  @Prop({ default: true })
  isPg: boolean;

  @Prop({ default: 0.5, max: 1, min: 0 })
  topP: number;

  @Prop({ default: 0.5, max: 1, min: 0 })
  temperature: number;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const AdlibSchema = SchemaFactory.createForClass(Adlib);
