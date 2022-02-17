import { Module } from '@nestjs/common';
import {MailerModule} from "@nestjs-modules/mailer";
import {EmailService} from "~/modules/email/email.service";
import {MongooseModule} from "@nestjs/mongoose";
import {Email, EmailSchema} from "~/modules/email/email.schema";

@Module({
  imports: [
    MailerModule,
    MongooseModule.forFeature([
      {name: Email.name, schema: EmailSchema}
    ]),
  ],
  exports: [EmailService],
  providers: [EmailService]
})
export class EmailModule {}
