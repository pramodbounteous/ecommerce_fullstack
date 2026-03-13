import { z } from "zod";

export const checkoutSchema = z.object({
  paymentMethod: z.string().trim().min(2),
  shippingAddress: z.string().trim().min(10)
});
