import {Document} from "mongoose";

export interface IWidget extends Document{
    id: string;
    name: string;
    type: string;
    settings: string;
}
