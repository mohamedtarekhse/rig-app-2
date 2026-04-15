import { z } from 'zod';
export const roleSchema = z.enum(['admin', 'manager', 'technician', 'user']);
export const successEnvelopeSchema = (data) => z.object({
    success: z.literal(true),
    data,
    error: z.null(),
    meta: z.record(z.string(), z.unknown()).optional(),
});
export const errorEnvelopeSchema = z.object({
    success: z.literal(false),
    data: z.null(),
    error: z.object({
        code: z.string(),
        message: z.string(),
        details: z.unknown().optional(),
    }),
    meta: z.record(z.string(), z.unknown()).optional(),
});
export const loginRequestSchema = z.object({
    username: z.string().min(1),
    password: z.string().min(1),
});
export const paginationQuerySchema = z.object({
    page: z.coerce.number().int().positive().default(1),
    pageSize: z.coerce.number().int().positive().max(100).default(25),
    q: z.string().trim().optional(),
});
