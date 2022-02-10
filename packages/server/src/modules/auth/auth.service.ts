import { Injectable } from '@nestjs/common';
import { Observable, from } from 'rxjs';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '../config/config.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly ConfigModule: ConfigService, 
    private readonly jwtService: JwtService
    ) {}
  async createToken(user: {id: string, username: string}): Promise<string> {
    return this.jwtService.sign(user)
  }

  async hashPassword(password: string): Promise<Observable<string>> {
    return from(await bcrypt.hash(password, 10))
  }

  async comparePasswords(password: string, stored: string): Promise<Observable<boolean>> {
    return from(bcrypt.compare(password, stored))
  }
}