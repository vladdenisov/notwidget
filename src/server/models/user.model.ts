import Database from '../dbConfigs';
import {Schema} from "mongoose";
import { IUser } from '../domain/IUser';

const {mongo: {model}} = Database;

const UserSchema: Schema<IUser> = new Schema<IUser>(
  {
    id: {type: String, required: true},
    email: {type: String, required: true},
    username: {type: String, required: true},
    widgets: {type: Array, required: true},
    isEmailVerified: {type: Boolean, default: false}
  }
);

export default model<IUser>('User',UserSchema);

