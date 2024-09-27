// Dependencies
import { z } from 'zod';
import type { Control, FieldPath } from 'react-hook-form';

export const productPartsPricingRulesFormSchema = z.object({
  description: z.string().min(1, { message: 'Description is required' }),
  additional_price: z.coerce.number({
    invalid_type_error: 'Additional price is required',
  }),
});

export interface ProductPartsPricingRulesProps {
  name: FieldPath<z.infer<typeof productPartsPricingRulesFormSchema>>;
  label: string;
  placeholder: string;
  description?: string;
  inputType?: string;
  formControl: Control<z.infer<typeof productPartsPricingRulesFormSchema>>;
  options?: Array<string>;
  disabled?: boolean;
}
