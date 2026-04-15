var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
];
let PlaceholderController = class PlaceholderController {
    modules() {
        return MODULES.map((name) => ({
            module: name,
            status: 'planned',
        }));
    }
};
__decorate([
    Get('status/modules'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PlaceholderController.prototype, "modules", null);
PlaceholderController = __decorate([
    ApiTags('status'),
    ApiBearerAuth(),
    UseGuards(JwtAuthGuard),
    Controller()
], PlaceholderController);
export { PlaceholderController };
