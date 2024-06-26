import {
  Controller,
  // Get,
  Post,
  Body,
  Res,
  HttpStatus,
  // Patch,
  // Param,
  // Delete,
} from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { Response } from 'express';
// import { CreateWebhookDto } from './dto/create-webhook.dto';

@Controller('webhook')
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  @Post()
  create(@Body() payload: any, @Res() res: Response) {
    if (payload.push_data.tag.length > 0) {
      return this.webhookService.create(payload, res);
    }
    const fecha = new Date(payload.push_data.pushed_at * 1000).toLocaleString();

    console.log(`Webhook ignorado - ${fecha}`);
    return res.status(HttpStatus.OK).json({ message: 'Webhook ignorado' });
  }

  // @Get()
  // findAll() {
  //   return this.webhookService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.webhookService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateWebhookDto: UpdateWebhookDto) {
  //   return this.webhookService.update(+id, updateWebhookDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.webhookService.remove(+id);
  // }
}
