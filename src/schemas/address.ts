import { z } from 'zod';
import { ERROR_MESSAGES } from '../constants';

export const addressSchema = z.object({
  name: z
    .string()
    .min(1, ERROR_MESSAGES.REQUIRED)
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  phone: z
    .string()
    .min(1, ERROR_MESSAGES.REQUIRED)
    .regex(/^[0-9]{10}$/, ERROR_MESSAGES.INVALID_PHONE),
  street: z
    .string()
    .min(1, ERROR_MESSAGES.REQUIRED)
    .min(5, 'Street address must be at least 5 characters')
    .max(200, 'Street address must be less than 200 characters'),
  city: z
    .string()
    .min(1, ERROR_MESSAGES.REQUIRED)
    .min(2, 'City must be at least 2 characters')
    .max(50, 'City must be less than 50 characters'),
  state: z
    .string()
    .min(1, ERROR_MESSAGES.REQUIRED)
    .min(2, 'State must be at least 2 characters')
    .max(50, 'State must be less than 50 characters'),
  pincode: z
    .string()
    .min(1, ERROR_MESSAGES.REQUIRED)
    .regex(/^[0-9]{6}$/, 'Please enter a valid 6-digit pincode'),
  type: z.enum(['HOME', 'WORK', 'OTHER'], {
    required_error: ERROR_MESSAGES.REQUIRED,
  }),
  isDefault: z.boolean().optional(),
});

export type AddressFormData = z.infer<typeof addressSchema>;