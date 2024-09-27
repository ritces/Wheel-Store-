// Dependencies
import { z } from 'zod';

export const orderItemSchema = z.object({
  product_id: z.number(),
  parts: z.array(
    z.object({
      id: z.number().nullable(),
      name: z.string(),
      selectedOption: z.object({
        id: z.number().nullable(),
        name: z.string(),
        price: z.number(),
      }),
    })
  ),
});
;
