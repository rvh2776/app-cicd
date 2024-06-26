import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoguerMiddleare implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(
      `Estas ejecutando un metodo: ${req.method} en la ruta: ${req.url}`,
    );
    next();
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function loggerGlobal(req: Request, res: Response, next: NextFunction) {
  const date: Date = new Date();
  const fecha: string = date.toLocaleString();
  console.log(
    `Se ejecutó un metodo: ${req.method} | en la ruta: ${req.url} | creado el: ${fecha}`,
  );
  next();
}
