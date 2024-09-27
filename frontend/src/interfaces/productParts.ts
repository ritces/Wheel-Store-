// Dependencies
import { z } from 'zod';
import type { Control, FieldPath } from 'react-hook-form';

export const productPartsFormSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  product: z.object({
    value: z.union([z.string(), z.number()]),
    label: z.string(),
  }),
});

export interface ProductPartsProps {
  name: FieldPath<z.infer<typeof productPartsFormSchema>>;
  label: string;
  placeholder: string;
  description?: string;
  inputType?: string;
  formControl: Control<z.infer<typeof productPartsFormSchema>>;
  options?: Array<string>;
  disabled?: boolean;
}
