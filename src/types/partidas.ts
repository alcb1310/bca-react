import { z } from "zod";

export const budgetItemSchema = z.object({
  id: z.string().uuid(),
  code: z.string()
    .min(1, "Código es obligatorio"),
  name: z.string()
    .min(1, "Nombre es obligatorio"),
  accumulates: z.boolean(),
})

export type BudgetItem = z.infer<typeof budgetItemSchema>;
