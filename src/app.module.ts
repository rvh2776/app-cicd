import { Module } from '@nestjs/common';
import { WebhookModule } from './modules/webhook/webhook.module';

@Module({
  imports: [WebhookModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
