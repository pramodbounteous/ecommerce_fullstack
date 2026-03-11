import { z } from "zod";

export const addressSchema = z.object({
  street: z.string().min(3),
  city: z.string().min(2),
  state: z.string().min(2),
  country: z.string().min(2),
  pincode: z.string().min(4)
});