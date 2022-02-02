import {Document} from "mongoose";
import { IWidget } from "./IWidget";

export interface IUser extends Document {
    id: string;
    email: string;
    username: string;
    widgets: IWidget[];
    isEmailVerified: boolean;
}
