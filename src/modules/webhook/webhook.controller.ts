import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { Response } from 'express';

const rojo = '\x1b[31m%s\x1b[0m';
// const verde = '\x1b[32m%s\x1b[0m';
// const amarillo = '\x1b[33m%s\x1b[0m';
// const azul = '\x1b[34m%s\x1b[0m';
// const magenta = '\x1b[35m%s\x1b[0m';
// const cian = '\x1b[36m%s\x1b[0m';
// const blanco = '\x1b[37m%s\x1b[0m';

@Controller('webhook')
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  @Post()
  create(@Body() payload: any, @Res() res: Response) {
    if (payload.push_data.tag.length > 0) {
      return this.webhookService.create(payload, res);
    }
    const fecha = new Date(payload.push_data.pushed_at * 1000).toLocaleString();

    console.log(rojo, `Webhook ignorado - ${fecha}`);

    return res.status(HttpStatus.OK).json({ message: 'Webhook ignorado' });
  }
}
