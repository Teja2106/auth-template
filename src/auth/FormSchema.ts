import { z } from 'zod';

export type FormState = 
    | {
        errors?: {
            email?: string[];
            password?: string[];
        };
        message?: string;
    }
    | undefined;

export type SessionPayload = {
    userId: string | number;
    expiresAt: Date;
};

export const LoginSchema = z.object({
    email: z.email({ message: 'Invalid email address.' }).trim(),
    password: z.string().min(1, { message: 'This field is mandatory.' }).trim()
});