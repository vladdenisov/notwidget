import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WidgetDocument = Widget & Document;

@Schema()
export class Widget {
  @Prop()
  name: string

  @Prop()
  id: string

  @Prop()
  user_id: string

  @Prop()
  config: string

  @Prop()
  type: string
}

export const WidgetSchema = SchemaFactory.createForClass(Widget);