import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import serverless from 'serverless-http';

let cachedServer: any;

async function bootstrap() {
  const expressApp = express();

  expressApp.use(express.json()); // JSONリクエストのパースを適用
  expressApp.use(express.urlencoded({ extended: true })); // URLエンコードされたデータの処理

  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));
  app.enableCors();
  await app.init();

  cachedServer = serverless(expressApp);
}

// Lambda ハンドラー
export async function handler(event: any, context: any) {
  if (!cachedServer) {
    await bootstrap();
  }
  return cachedServer(event, context);
}
