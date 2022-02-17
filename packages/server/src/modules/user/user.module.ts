import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { ConfigService } from '../config/config.service';
import { UserController } from './user.controller';
import { Users, UserSchema } from './user.schema';
import { UserService } from './user.service';
import {EmailModule} from "~/modules/email/email.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: Users.name, schema: UserSchema}
    ]),
    ConfigService,
    AuthModule,
    EmailModule
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
