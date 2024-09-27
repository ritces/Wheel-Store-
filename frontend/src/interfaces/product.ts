// Dependencies
import { z } from 'zod';
import type { Control, FieldPath } from 'react-hook-form';

const MAX_UPLOAD_SIZE = 1024 * 1024 * 3; // 3MB
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

export const productFormSchema = z.object({
  name: z
    .string({ required_error: 'Product name is required' })
    .min(1, { message: 'Product name is required' }),
  description: z
    .string({ required_error: 'Product description is required' })
    .min(1, { message: 'Product description is required' }),
  price: z.coerce.number({ invalid_type_error: 'Price is required' }),
  stock_quantity: z.coerce.number({
    invalid_type_error: 'Stock quantity is required',
  }),
  type: z.string({ required_error: 'Product type is required' }),
  image: z
    .instanceof(File)
    .refine((file) => {
      return !file || file.size <= MAX_UPLOAD_SIZE;
    }, 'File size must be less than 3MB')
    .refine((file) => {
      if (file) return ACCEPTED_IMAGE_TYPES.includes(file.type);
      return false;
    }, 'Only .jpg, .jpeg, .png .webp formats are supported.'),
});

export interface ProductProps {
  name: FieldPath<z.infer<typeof productFormSchema>>;
  label: string;
  placeholder: string;
  description?: string;
  inputType?: string;
  formControl: Control<z.infer<typeof productFormSchema>>;
  options?: Array<string>;
  disabled?: boolean;
}
