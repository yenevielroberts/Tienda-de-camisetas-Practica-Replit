import { Test, TestingModule } from '@nestjs/testing';
import { MessagesService } from './messages.service';
import { DatabaseService } from '../database/database.service';

describe('MessagesService', () => {
  let service: MessagesService;
  let databaseService: DatabaseService;

  const mockDatabaseService = {
    db: {
      select: jest.fn().mockReturnThis(),
      from: jest.fn().mockResolvedValue([
        { id: 1, content: 'Test message 1' },
        { id: 2, content: 'Test message 2' },
      ]),
      insert: jest.fn().mockReturnThis(),
      values: jest.fn().mockReturnThis(),
      returning: jest.fn().mockResolvedValue([
        { id: 1, content: 'New message' },
      ]),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessagesService,
        {
          provide: DatabaseService,
          useValue: mockDatabaseService,
        },
      ],
    }).compile();

    service = module.get<MessagesService>(MessagesService);
    databaseService = module.get<DatabaseService>(DatabaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of messages', async () => {
      const result = await service.findAll();

      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(2);
      expect(databaseService.db.select).toHaveBeenCalled();
    });
  });

  describe('create', () => {
    it('should create a new message', async () => {
      const newMessage = { content: 'New message' };
      const result = await service.create(newMessage);

      expect(result).toBeDefined();
      expect(result.content).toBe('New message');
      expect(databaseService.db.insert).toHaveBeenCalled();
    });
  });
});
