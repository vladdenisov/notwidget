import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '../config/config.service';
import { WidgetController } from './widget.controller';
import { Widget, WidgetSchema } from './widget.schema';
import { WidgetService } from './widget.service';

@Module({
  imports: [
    ConfigService,
    MongooseModule.forFeature([
      {name: Widget.name, schema: WidgetSchema}
    ])
  ],
  controllers: [WidgetController],
  providers: [WidgetService]
})
export class WidgetModule {}
