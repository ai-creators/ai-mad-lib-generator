import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AdlibDocument = HydratedDocument<Adlib>;

@Schema({ timestamps: true })
export class Adlib {
  @Prop({ required: true })
  prompt: string;

  @Prop({ required: true })
  text: string;

  @Prop({ default: 0, required: false })
  numberOfLikes: number;

  @Prop({ default: 0, required: false })
  numberOfDislikes: number;

  @Prop({ default: false, required: false })
  isHidden: boolean;

  @Prop({ default: false, required: false })
  isPG: boolean;
}

export const AdlibSchema = SchemaFactory.createForClass(Adlib);
