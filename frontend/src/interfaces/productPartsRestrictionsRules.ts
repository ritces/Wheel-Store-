// Dependencies
import { z } from 'zod';
import type { Control, FieldPath } from 'react-hook-form';

export const productPartsRestrictionsRulesFormSchema = z.object({
  description: z.string().min(1, { message: 'Description is required' }),
});

export interface ProductPartsRestrictionsRulesProps {
  name: FieldPath<z.infer<typeof productPartsRestrictionsRulesFormSchema>>;
  label: string;
  placeholder: string;
  description?: string;
  inputType?: string;
  formControl: Control<z.infer<typeof productPartsRestrictionsRulesFormSchema>>;
  options?: Array<string>;
  disabled?: boolean;
}
