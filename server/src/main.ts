import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { WsAdapter } from '@nestjs/platform-ws';
import { createProxyMiddleware } from 'http-proxy-middleware';


let PORT = process.env.PORT || 8888

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors()
  // app.useWebSocketAdapter(new WsAdapter(app));

  // Proxy endpoints
  app.use('/', createProxyMiddleware({
    target:  "https://istrav-headquarters.vercel.app",
    changeOrigin: true,
  }));

  // attach
  await app.listen(PORT);
  console.log(`Application is running on ${await app.getUrl()}`)
}
bootstrap();
