import { Controller, Get, UnauthorizedException, Req } from '@nestjs/common';
import { Widget } from './widget.schema';
import { Request } from 'express';
import { WidgetService } from './widget.service';

@Controller('widget')
export class WidgetController {
  constructor(private readonly widgetService: WidgetService) {}
  @Get('my')
  async getMyWidgets(@Req() request: Request): Promise<Widget[]> {
    const token = request.headers.authorization?.replace('Bearer ', '')
    if (!token) throw new UnauthorizedException("Invalid Token")
    return await this.widgetService.getByToken(token)
  }
  
  // @Post('create')
  // async create(@Req() request: Request): Promise<Widget> {
  //   const token = request.headers.authorization?.replace('Bearer ', '')
  //   if (!token) throw new UnauthorizedException("Invalid Token")
  //   return await this.widgetService.create(token)
  // }
}
