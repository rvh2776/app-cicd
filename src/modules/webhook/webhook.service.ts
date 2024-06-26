import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateWebhookDto } from './dto/create-webhook.dto';
import { config as dotenvConfig } from 'dotenv';
import { Response } from 'express';

dotenvConfig({ path: '.env' });

@Injectable()
export class WebhookService {
  constructor() {}
  private webhookAceptados: Record<string, number> = {};
  private webhookRechazados: Record<string, number> = {};

  create(payload: CreateWebhookDto, res: Response) {
    const repoName = process.env.repoName;
    const hookName = process.env.hookName;

    const fecha = new Date(payload.push_data.pushed_at * 1000).toLocaleString();

    if (!payload.repository || !payload.repository.repo_name) {
      console.log(`Invalid webhook payload - ${fecha}`);
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: `Invalid webhook payload - ${fecha}` });
    }

    if (
      payload &&
      payload.repository &&
      payload.repository.repo_name === repoName &&
      payload.repository.name === hookName
    ) {
      console.log('Webhook recibido:', payload);

      const webhookId = payload.repository.repo_name;
      if (!this.webhookAceptados[webhookId]) {
        this.webhookAceptados[webhookId] = 0;
      }
      this.webhookAceptados[webhookId]++;
      console.log(
        `Webhook aceptado desde: ${webhookId}: ${this.webhookAceptados[webhookId]} - ${fecha}`,
      );

      // TODO: crear la logica para actualizar la imagen docker.

      return res
        .status(HttpStatus.OK)
        .json({ message: `Webhook received successfully - ${fecha}` });
    } else {
      const webhookId = payload.repository.repo_name;
      if (!this.webhookRechazados[webhookId]) {
        this.webhookRechazados[webhookId] = 0;
      }
      this.webhookRechazados[webhookId]++;

      console.log(
        `Webhook rechazado desde: ${webhookId}: ${this.webhookRechazados[webhookId]} - ${fecha}`,
      );

      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: `Invalid webhook payload - ${fecha}` });
    }
  }

  // async findAll() {
  //   return `<h1>Server online.</h1>`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} webhook`;
  // }

  // update(id: number, updateWebhookDto: UpdateWebhookDto) {
  //   return `This action updates a #${id} webhook`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} webhook`;
  // }
}
