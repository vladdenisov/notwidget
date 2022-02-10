import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ConfigService } from "../config/config.service";
import { Widget, WidgetDocument } from "./widget.schema";
import * as jwt from "jsonwebtoken"
@Injectable()
export class WidgetService {
  constructor(@InjectModel(Widget.name) private widgetModel: Model<WidgetDocument>, private readonly ConfigModule: ConfigService) {}
  private async checkToken(token: string): Promise<{id: string, _id: string}> {
    const decodedToken: {id: string, _id: string} = await <{id: string, _id: string}>jwt.verify(token, this.ConfigModule.secretJwtKey) 
    if (!decodedToken) throw new UnauthorizedException("Invalid Token")
    else return decodedToken
  }
  async getByToken(token: string): Promise<Widget[]> {
    const decodedToken = await this.checkToken(token)
    return this.widgetModel.find({user_id: decodedToken.id})
  }
  // async create(token: string): Promise<Widget[]> {
    
  // }
}