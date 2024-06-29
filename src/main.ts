/* eslint-disable @typescript-eslint/no-unused-vars */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { loggerGlobal } from './middlewares/logger.middleware';
import { exec } from 'child_process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //? Ejecutar setup antes de iniciar el proyecto.
  await new Promise<void>((resolve, reject) => {
    exec('./src/script/setup.sh', (error, stdout, stderr) => {
      if (error) {
        console.error(`Error ejecutando entorno:\n${error}`);
        reject(error);
        return;
      }
      console.log(`\n${stdout}`);
      resolve();
    });
  });

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
