// Dependencies
import { z } from 'zod';
import type { Control, FieldPath } from 'react-hook-form';

export const productPartsOptionFormSchema = z.object({
  part: z.object({
    value: z.union([z.string(), z.number()]),
    label: z.string(),
  }),
  name: z
    .string({ required_error: 'Part Option name is required' })
    .min(1, { message: 'Part Option name is required' }),
  price: z.coerce.number({ invalid_type_error: 'Price is required' }),
  is_available: z.boolean(),
});

export interface ProductPartsOptionProps {
  name: FieldPath<z.infer<typeof productPartsOptionFormSchema>>;
  label: string;
  placeholder: string;
  description?: string;
  inputType?: string;
  formControl: Control<z.infer<typeof productPartsOptionFormSchema>>;
  options?: Array<string>;
  disabled?: boolean;
}
