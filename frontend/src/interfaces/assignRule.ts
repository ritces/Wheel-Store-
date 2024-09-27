// Dependencies
import { z } from 'zod';
import type { Control, FieldPath } from 'react-hook-form';

export const assignRuleFormSchema = z.object({
  rule: z.object({
    value: z.union([z.string(), z.number()]),
    label: z.string(),
  }),
});

export interface AssignRuleProps {
  name: FieldPath<z.infer<typeof assignRuleFormSchema>>;
  label: string;
  placeholder: string;
  description?: string;
  inputType?: string;
  formControl: Control<z.infer<typeof assignRuleFormSchema>>;
  options?: Array<string>;
  disabled?: boolean;
}
