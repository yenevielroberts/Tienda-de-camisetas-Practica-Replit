import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { Message, insertMessageSchema, InsertMessage } from '@shared/schema';
import { z } from 'zod';

@Controller('api/messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get()
  async findAll(): Promise<Message[]> {
    return this.messagesService.findAll();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() body: unknown): Promise<Message> {
    try {
      const input = insertMessageSchema.parse(body);
      return await this.messagesService.create(input);
    } catch (err) {
      if (err instanceof z.ZodError) {
        throw new BadRequestException({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  }
}
