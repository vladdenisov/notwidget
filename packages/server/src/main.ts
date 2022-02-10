// import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { APIModule } from './modules/api.module';
import { ConfigService } from './modules/config/config.service';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(APIModule);
  const config = app.get(ConfigService);
  app.enableCors({ origin: config.corsWhiteList });
  // app.use(new ValidationPipe())
  await app.listen(config.port);
}

bootstrap();
