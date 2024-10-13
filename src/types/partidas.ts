import { z } from "zod";

export const budgetItemSchema = z.object({
  id: z.string().optional(),
  code: z.string()
    .min(1, "Código es obligatorio"),
  name: z.string()
    .min(1, "Nombre es obligatorio"),
  accumulate: z.boolean(),
  parent_id: z.string().optional(),
})

export type BudgetItem = z.infer<typeof budgetItemSchema>;

export const budgetItemResponseShema = z.object({
  id: z.string().uuid(),
  code: z.string()
    .min(1, "Código es obligatorio"),
  name: z.string()
    .min(1, "Nombre es obligatorio"),
  accumulate: z.boolean(),
  parent: budgetItemSchema.optional(),
})

export type BudgetItemResponse = z.infer<typeof budgetItemResponseShema>;

