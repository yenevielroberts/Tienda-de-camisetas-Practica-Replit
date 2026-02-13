import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';

describe('HealthController', () => {
  let controller: HealthController;
  let service: HealthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [HealthService],
    }).compile();

    controller = module.get<HealthController>(HealthController);
    service = module.get<HealthService>(HealthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getHealth', () => {
    it('should return health response', () => {
      const result = controller.getHealth();

      expect(result).toBeDefined();
      expect(result.status).toBe('healthy');
      expect(result.data).toBeDefined();
      expect(result.count).toBe(6);
    });

    it('should call healthService.getSportsTshirts', () => {
      const spy = jest.spyOn(service, 'getSportsTshirts');
      controller.getHealth();

      expect(spy).toHaveBeenCalled();
    });
  });
});
