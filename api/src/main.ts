import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { format, transports } from 'winston';
import { WinstonModule, utilities as nestWinstonUtilities } from 'nest-winston';

const { PORT } = process.env;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger: WinstonModule.createLogger({
      transports: [
        new transports.Console({
          level: 'silly',
          format: format.combine(
            format.timestamp(),
            format.ms(),
            nestWinstonUtilities.format.nestLike('HRManager'),
          ),
        }),
      ],
    }),
  });
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('HR Management API')
    .setDescription('This API helps manager employees data')
    .addBearerAuth()
    .build();
  if (process.env.NODE_ENV !== 'production') {
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger', app, document);
  }

  await app.listen(PORT);
}
bootstrap();
