import { z } from 'zod';
import { ERROR_MESSAGES } from '../constants';

export const contactSchema = z.object({
  name: z
    .string()
    .min(1, ERROR_MESSAGES.REQUIRED)
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  email: z
    .string()
    .min(1, ERROR_MESSAGES.REQUIRED)
    .email(ERROR_MESSAGES.INVALID_EMAIL),
  phone: z
    .string()
    .optional()
    .refine((val) => !val || /^[0-9]{10}$/.test(val), {
      message: ERROR_MESSAGES.INVALID_PHONE,
    }),
  subject: z
    .string()
    .min(1, ERROR_MESSAGES.REQUIRED)
    .min(5, 'Subject must be at least 5 characters')
    .max(200, 'Subject must be less than 200 characters'),
  message: z
    .string()
    .min(1, ERROR_MESSAGES.REQUIRED)
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be less than 1000 characters'),
});

export type ContactFormData = z.infer<typeof contactSchema>;