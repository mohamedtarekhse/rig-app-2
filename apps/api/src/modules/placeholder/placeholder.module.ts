import { Module } from '@nestjs/common';
import { PlaceholderController } from './placeholder.controller.js';

@Module({
  controllers: [PlaceholderController],
})
export class PlaceholderModule {}
