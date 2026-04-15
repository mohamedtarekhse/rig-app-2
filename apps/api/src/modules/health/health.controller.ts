import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
  @Get()
  check() {
    return {
      healthy: true,
      service: 'rigways-api',
      timestamp: new Date().toISOString(),
    };
  }
}
