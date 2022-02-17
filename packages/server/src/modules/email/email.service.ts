import {BadRequestException, ConflictException, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {ConfigService} from "~/modules/config/config.service";
import {Email, EmailDocument} from "~/modules/email/email.schema";
import {nanoid} from "nanoid";
import {MailerService} from "@nestjs-modules/mailer";

@Injectable()
export class EmailService {
  constructor(
    @InjectModel(Email.name) private emailModel: Model<EmailDocument>,
    private readonly ConfigModule: ConfigService,
    private readonly mailerService: MailerService
  ) {}

  async addEmail(email: string): Promise<boolean> {
    if (!await this.emailModel.findOne({
      email
    })) {
      const emailDocument = new this.emailModel({
        email: email,
        code: nanoid(6).toLocaleUpperCase(),
        hash: nanoid(21)
      })
      await emailDocument.save()
    }
    await this.sendCode(email)
    return true
  }
  async sendCode(email: string): Promise<boolean> {
    const emailDocument = await this.emailModel.findOne({
      email
    })
    await this.mailerService.sendMail({
      to: email,
      from: this.ConfigModule.emailUser,
      subject: 'Notwidget email confirmat ✔',
      template: 'verify', // The `.pug`, `.ejs` or `.hbs` extension is appended automatically.
      context: {
        // Data to be sent to template engine.
        code: emailDocument?.code,
      },
    }).catch(e => console.error(e))
    return true
  }
  async verifyCode(email: string, code: string): Promise<{hash?: string}> {
    const emailDocument = await this.emailModel.findOne({
      email
    })
    if (!emailDocument)
      throw new BadRequestException()
    if (code.toLocaleUpperCase() === emailDocument.code) {
      return {
        hash: emailDocument.hash
      }
    }
    return {}
  }
}
