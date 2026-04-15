import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';

const MODULES = [
  'clients',
  'functional-locations',
  'inspectors',
  'assets',
  'certificates',
  'jobs',
  'notifications',
  'reports',
  'uploads',
  'audit',
] as const;

@ApiTags('status')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller()
export class PlaceholderController {
  @Get('status/modules')
  modules() {
    return MODULES.map((name) => ({
      module: name,
      status: 'planned',
    }));
  }
}
