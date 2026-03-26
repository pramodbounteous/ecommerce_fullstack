import { z } from "zod";

export const addressSchema = z.object({
  label: z.string().trim().min(2),
  fullName: z.string().trim().min(2),
  email: z.string().trim().email(),
  phone: z.string().trim().min(10),
  addressLine1: z.string().trim().min(5),
  addressLine2: z.string().trim().optional(),
  city: z.string().trim().min(2),
  state: z.string().trim().min(2),
  country: z.string().trim().min(2),
  pincode: z.string().trim().min(4)
});
