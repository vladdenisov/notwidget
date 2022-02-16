import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';

import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { StatusModule } from './status/status.module';
import { UserModule } from './user/user.module';
import { WidgetModule } from './widget/widget.module';
import {MailerModule} from "@nestjs-modules/mailer";
import {PugAdapter} from "@nestjs-modules/mailer/dist/adapters/pug.adapter";

@Module({
  imports: [
    ConfigModule,
    StatusModule,
    UserModule,
    WidgetModule,
    AuthModule,
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        transport: configService.transportUrl,
        defaults: {
          from: configService.emailUser,
        },
        template: {
          dir: __dirname + '/email/templates',
          adapter: new PugAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.mongo,
        dbName: 'notwidget'
      }),
      inject: [ConfigService],
    })
  ],
})
export class APIModule {}
