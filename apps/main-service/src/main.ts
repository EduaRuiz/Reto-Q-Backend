import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  await app.listen(3000 || process.env.PORT);
  console.log(
    `🚀 Application is running on: ${await app.getUrl()} MAIN-SERVICE 🚀`,
  );
}
bootstrap();
