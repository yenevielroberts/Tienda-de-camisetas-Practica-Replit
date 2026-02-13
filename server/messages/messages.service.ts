import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { messages, Message, InsertMessage } from '@shared/schema';

@Injectable()
export class MessagesService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll(): Promise<Message[]> {
    return await this.databaseService.db.select().from(messages);
  }

  async create(insertMessage: InsertMessage): Promise<Message> {
    const result = await this.databaseService.db
      .insert(messages)
      .values(insertMessage as any)
      .returning();
    return result[0];
  }
}
