import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = Users & Document;

@Schema()
export class Users {
  @Prop()
  username: string

  @Prop()
  email: string

  @Prop()
  widgets: {
    id: string
  }[];

  @Prop()
  password: string

  @Prop()
  id: string
}

export const UserSchema = SchemaFactory.createForClass(Users);