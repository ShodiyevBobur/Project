import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';


async function Start() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  console.log(config.get<number>("PORT"));
  
  const PORT = config.get<number>('PORT') || 3030;

   app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api')
  const options = new DocumentBuilder()
    .setTitle('Taxi Uzbekistan')
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
