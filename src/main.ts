import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Context, Handler } from 'aws-lambda';
import serverless from 'serverless-http';

let cachedServer: any; // キャッシュ

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // CORS 設定が必要なら追加
  await app.init(); // `app.listen(3000)` は削除

  const expressApp = app.getHttpAdapter().getInstance(); // `express` インスタンスを取得
  return serverless(expressApp); // `serverless-http` に渡す
}

// Lambda の `handler` をエクスポート
export const handler: Handler = async (event: any, context: Context) => {
  if (!cachedServer) {
    cachedServer = await bootstrap(); // 初回のみ初期化
  }
  return cachedServer(event, context); // `callback` は不要
};
