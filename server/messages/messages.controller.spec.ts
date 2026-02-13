import { Test, TestingModule } from '@nestjs/testing';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';

describe('MessagesController', () => {
  let controller: MessagesController;
  let service: MessagesService;

  const mockMessagesService = {
    findAll: jest.fn().mockResolvedValue([
      { id: 1, content: 'Test message 1' },
      { id: 2, content: 'Test message 2' },
    ]),
    create: jest.fn().mockResolvedValue({ id: 1, content: 'New message' }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MessagesController],
      providers: [
        {
          provide: MessagesService,
          useValue: mockMessagesService,
        },
      ],
    }).compile();

    controller = module.get<MessagesController>(MessagesController);
    service = module.get<MessagesService>(MessagesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of messages', async () => {
      const result = await controller.findAll();

      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(2);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('create', () => {
    it('should create a new message with valid input', async () => {
      const newMessage = { content: 'New message' };
      const result = await controller.create(newMessage);

      expect(result).toBeDefined();
      expect(result.content).toBe('New message');
      expect(service.create).toHaveBeenCalledWith(newMessage);
    });
  });
});
