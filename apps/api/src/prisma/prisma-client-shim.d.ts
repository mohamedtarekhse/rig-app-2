declare module '@prisma/client' {
  export enum UserRole {
    admin = 'admin',
    manager = 'manager',
    technician = 'technician',
    user = 'user',
  }

  export class PrismaClient {
    $connect(): Promise<void>;
    $disconnect(): Promise<void>;
    $on(event: string, listener: (...args: unknown[]) => unknown): void;
    user: any;
    client: any;
  }
}
