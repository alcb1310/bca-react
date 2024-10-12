import { z } from "zod";

export const budgetItemSchema = z.object({
  id: z.string().uuid(),
  code: z.string()
    .min(1, "Código es obligatorio"),
  name: z.string()
    .min(1, "Nombre es obligatorio"),
  accumulate: z.boolean(),
  parent_id: z.string().optional(),
})

export type BudgetItem = z.infer<typeof budgetItemSchema>;
