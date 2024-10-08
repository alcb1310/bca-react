import { z } from "zod";

export const userResponseSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email: z.string(),
  company_id: z.string().uuid(),
  role_id: z.string(),
});

export type UserResponse = z.infer<typeof userResponseSchema>;
