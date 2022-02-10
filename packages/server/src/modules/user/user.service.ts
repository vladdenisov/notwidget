import { ConflictException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateUserDto } from "./dto/create-user.dto";
import { Users, UserDocument } from "./user.schema";
import * as bcrypt from 'bcrypt'
import * as jwt from "jsonwebtoken"
import { nanoid } from "nanoid";
import { ConfigService } from "../config/config.service";
import { AuthService } from "../auth/auth.service";
import { LoginDto } from "./dto/login.dto";

@Injectable() 
export class UserService {
  constructor(
    @InjectModel(Users.name) private userModel: Model<UserDocument>, 
    private readonly ConfigModule: ConfigService,
    private readonly AuthService: AuthService
  ) {}

  async findAll(): Promise<Users[]> {
    return this.userModel.find().exec()
  }

  async create(createUserDto: CreateUserDto): Promise<{ username: string; id: string; }> {
    const hashed = await bcrypt.hash(createUserDto.password, 10)
    const isUser = await this.userModel.find({$or: [{username: createUserDto.username}, {email: createUserDto.email}]})
    if (isUser[0]) {
      throw new ConflictException()
    }
    const user = await this.userModel.create({
      username: createUserDto.username,
      password: hashed,
      email: createUserDto.email,
      id: nanoid(10)
    })
    return {
      id: user.id,
      username: user.username
    }
  }

  async findOne(email: string): Promise<Users | null> {
    return this.userModel.findOne({email})
  }

  async validateUser(loginDto: LoginDto): Promise<Users | null> {
    const user = await this.findOne(loginDto.email);
    if (user && await this.AuthService.comparePasswords(loginDto.password, user.password)) {
      return user
    }
    throw new UnauthorizedException()
    return null;
  }


  async checkToken(token: string): Promise<{id: string, _id: string} | Record<string, never>> {
    const decodedToken: {id: string, _id: string} = await <{id: string, _id: string}>jwt.verify(token, this.ConfigModule.secretJwtKey) 
    if (!decodedToken) return {}
    else return decodedToken
  }


  async getUser(id: string): Promise<{
    username: string;
    email: string;
    widgets: []
  }> {
    const user = await this.userModel.findOne({id})
    if (!user) throw new UnauthorizedException("Invalid Token")
    return {
      username: user.username,
      email: user.email,
      widgets: []
    }
  }
}