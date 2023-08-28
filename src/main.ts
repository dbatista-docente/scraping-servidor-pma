import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { type Server } from 'http';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const port = process.env.PORT ?? 3000;
  const app = await NestFactory.create<INestApplication>(AppModule, {
    cors: true,
  });
  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder().build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', await app, document);
  const server: Server = await app.listen(port, () => {
    console.log(
      `Application running on ${
        !process.env.PORT ? `http://localhost:${port}` : `port ${port}`
      }`,
    );
  });
  process.on('SIGINT', () => {
    server.close();
    console.log('Finished Application');
  });
}
bootstrap();
