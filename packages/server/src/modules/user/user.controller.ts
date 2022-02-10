import { Body, ConflictException, Controller, Get, HttpStatus, Param, Post, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Users } from './user.schema';
import { UserService } from './user.service';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { LoginDto } from './dto/login.dto';
import { AuthService } from '../auth/auth.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) {}

  @Post("login")
  async login(@Body() loginDto: LoginDto): Promise<{ token: string; id: string }> {
    const user = await this.userService.validateUser(loginDto)
    if (!user) throw new UnauthorizedException()
    return {
      id: user.id,
      token: await this.authService.createToken({
        id: user.id,
        username: user.username
      })
    }
  }

  @Post("create")
  async createUser(@Body() createUserDto: CreateUserDto): Promise<{ token: string; id: string }> {
    const user = await this.userService.create(createUserDto)
    const token = await this.authService.createToken({
      username: user.username,
      id: user.id
    })
    return {
      token: token,
      id: user.id
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(): Promise<Users[]> {
    return await this.userService.findAll()
  }


  @Get(':id') 
  @UseGuards(JwtAuthGuard)
  async getInfo(@Param('id') id: string): Promise<{
    username: string;
    email: string;
    widgets: []
  }> {
    return await this.userService.getUser(id)
  }
}
