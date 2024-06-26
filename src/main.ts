import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { loggerGlobal } from './middlewares/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //* Validador global de Pipes.
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      exceptionFactory: (errors) => {
        const cleanErrors = errors.map((error) => {
          return { property: error.property, constraints: error.constraints };
        });
        return new BadRequestException({
          alert: 'Se han detectado lo siguientes errores en la petición',
          errors: cleanErrors,
        });
      },
    }),
  );

  app.use(loggerGlobal);

  await app.listen(3003);
}
bootstrap();
