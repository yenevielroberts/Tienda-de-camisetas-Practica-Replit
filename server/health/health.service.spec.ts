import { Test, TestingModule } from '@nestjs/testing';
import { HealthService } from './health.service';

describe('HealthService', () => {
  let service: HealthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HealthService],
    }).compile();

    service = module.get<HealthService>(HealthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getSportsTshirts', () => {
    it('should return sports tshirts collection', () => {
      const result = service.getSportsTshirts();

      expect(result).toBeDefined();
      expect(result.status).toBe('healthy');
      expect(result.message).toBe('Sports t-shirts collection');
      expect(result.data).toBeDefined();
      expect(Array.isArray(result.data)).toBe(true);
      expect(result.count).toBe(6);
      expect(result.data.length).toBe(6);
    });

    it('should return valid tshirt objects', () => {
      const result = service.getSportsTshirts();
      const firstTshirt = result.data[0];

      expect(firstTshirt).toHaveProperty('id');
      expect(firstTshirt).toHaveProperty('name');
      expect(firstTshirt).toHaveProperty('category');
      expect(firstTshirt).toHaveProperty('price');
      expect(firstTshirt).toHaveProperty('color');
      expect(firstTshirt).toHaveProperty('material');
      expect(firstTshirt).toHaveProperty('features');
      expect(firstTshirt).toHaveProperty('inStock');
      expect(Array.isArray(firstTshirt.features)).toBe(true);
    });

    it('should return timestamp in ISO format', () => {
      const result = service.getSportsTshirts();
      const timestamp = new Date(result.timestamp);

      expect(timestamp).toBeInstanceOf(Date);
      expect(timestamp.toISOString()).toBe(result.timestamp);
    });
  });
});
