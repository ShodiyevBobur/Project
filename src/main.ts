import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';


async function Start() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const PORT = config.get<number>('API_PORT') || 3030;

  app.setGlobalPrefix('api')
  const options = new DocumentBuilder()
    .setTitle('Your API Title')
    .setDescription('API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/docs', app, document);
  app.use(cookieParser());

  await app.listen(PORT);
  console.log(`Server is running on http://localhost:${PORT}`);
}
Start();
