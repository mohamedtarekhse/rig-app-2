import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import type { Role } from '@rigways/types';

@Injectable()
export class TenantGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<{
      user?: { role?: Role; clientId?: string | null };
      query: Record<string, string | undefined>;
      body: Record<string, unknown>;
    }>();

    const role = request.user?.role;
    if (!role || role === 'admin' || role === 'manager') {
      return true;
    }

    const scopedClient = request.user?.clientId ?? null;
    if (!scopedClient) {
      return false;
    }

    const requestedClient =
      String(request.query.clientId ?? request.body.clientId ?? request.body.client_id ?? scopedClient);

    return requestedClient === scopedClient;
  }
}
