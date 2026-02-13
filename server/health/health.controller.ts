import { Controller, Get } from '@nestjs/common';
import { HealthService, HealthResponse } from './health.service';

@Controller()
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get('health')
  getHealth(): HealthResponse {
    return this.healthService.getSportsTshirts();
  }
}
