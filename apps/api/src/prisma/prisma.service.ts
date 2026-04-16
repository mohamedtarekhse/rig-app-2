import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import prisma from '@prisma/client';

const { PrismaClient } = prisma;

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
