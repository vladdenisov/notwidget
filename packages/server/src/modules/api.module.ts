import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';

import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { StatusModule } from './status/status.module';
import { UserModule } from './user/user.module';
import { WidgetModule } from './widget/widget.module';

@Module({
  imports: [
    ConfigModule, 
    StatusModule, 
    UserModule,
    WidgetModule,
    AuthModule,
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
