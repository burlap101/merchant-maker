import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as path from 'path';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(cookieParser());
  app.useStaticAssets(path.join(__dirname, 'public'));
  app.setBaseViewsDir(path.join(__dirname, 'views'));
  app.setViewEngine('hbs');
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
