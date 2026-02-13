import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { HealthModule } from './health/health.module';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [
    DatabaseModule,
    HealthModule,
    MessagesModule,
  ],
})
export class AppModule {}
