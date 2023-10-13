import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AdlibFeaturedDocument = HydratedDocument<AdlibFeatured>;

@Schema({ timestamps: true })
export class AdlibFeatured {
  @Prop({ required: true })
  prompt: string;

  @Prop({ required: true })
  text: string;

  @Prop({ default: 0 })
  numberOfLikes: number;

  @Prop({ default: 0 })
  numberOfDislikes: number;

  @Prop({ default: false })
  isHidden: boolean;

  @Prop({ default: false })
  isPG: boolean;
}

export const AdlibFeaturedSchema = SchemaFactory.createForClass(AdlibFeatured);
