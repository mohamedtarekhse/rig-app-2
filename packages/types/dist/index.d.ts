import { z } from 'zod';
export declare const roleSchema: z.ZodEnum<["admin", "manager", "technician", "user"]>;
export type Role = z.infer<typeof roleSchema>;
export declare const successEnvelopeSchema: <T extends z.ZodTypeAny>(data: T) => z.ZodObject<{
    success: z.ZodLiteral<true>;
    data: T;
    error: z.ZodNull;
    meta: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, z.objectUtil.addQuestionMarks<z.baseObjectOutputType<{
    success: z.ZodLiteral<true>;
    data: T;
    error: z.ZodNull;
    meta: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}>, any> extends infer T_1 ? { [k in keyof T_1]: T_1[k]; } : never, z.baseObjectInputType<{
    success: z.ZodLiteral<true>;
    data: T;
    error: z.ZodNull;
    meta: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}> extends infer T_2 ? { [k_1 in keyof T_2]: T_2[k_1]; } : never>;
export declare const errorEnvelopeSchema: z.ZodObject<{
    success: z.ZodLiteral<false>;
    data: z.ZodNull;
    error: z.ZodObject<{
        code: z.ZodString;
        message: z.ZodString;
        details: z.ZodOptional<z.ZodUnknown>;
    }, "strip", z.ZodTypeAny, {
        code: string;
        message: string;
        details?: unknown;
    }, {
        code: string;
        message: string;
        details?: unknown;
    }>;
    meta: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    success: false;
    data: null;
    error: {
        code: string;
        message: string;
        details?: unknown;
    };
    meta?: Record<string, unknown> | undefined;
}, {
    success: false;
    data: null;
    error: {
        code: string;
        message: string;
        details?: unknown;
    };
    meta?: Record<string, unknown> | undefined;
}>;
export declare const loginRequestSchema: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username: string;
    password: string;
}, {
    username: string;
    password: string;
}>;
export declare const paginationQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
    pageSize: z.ZodDefault<z.ZodNumber>;
    q: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    page: number;
    pageSize: number;
    q?: string | undefined;
}, {
    page?: number | undefined;
    pageSize?: number | undefined;
    q?: string | undefined;
}>;
export type LoginRequest = z.infer<typeof loginRequestSchema>;
export type PaginationQuery = z.infer<typeof paginationQuerySchema>;
export type ApiSuccess<T> = {
    success: true;
    data: T;
    error: null;
    meta?: Record<string, unknown>;
};
export type ApiError = {
    success: false;
    data: null;
    error: {
        code: string;
        message: string;
        details?: unknown;
    };
    meta?: Record<string, unknown>;
};
export type ApiResponse<T> = ApiSuccess<T> | ApiError;
