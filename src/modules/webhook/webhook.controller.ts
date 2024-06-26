import {
  Controller,
  // Get,
  Post,
  Body,
  Res,
  // Patch,
  // Param,
  // Delete,
} from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { Response } from 'express';

@Controller('webhook')
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  @Post()
  create(@Body() payload: any, @Res() res: Response) {
    return this.webhookService.create(payload, res);
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
