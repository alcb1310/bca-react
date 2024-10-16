import { z } from "zod";
import { projectSchema } from "./project";
import { budgetItemSchema } from "./partidas";

export const budgetSchema = z.object({})

export type BudgetType = z.infer<typeof budgetSchema>

export const budgetResponseSchema = z.object({
  project: projectSchema,
  budget_item: budgetItemSchema,
  initial_quantity: z.number().optional(),
  initial_cost: z.number().optional(),
  initial_total: z.number(),
  spent_quantity: z.number().optional(),
  spent_total: z.number(),
  remaining_quantity: z.number().optional(),
  remaining_cost: z.number().optional(),
  remaining_total: z.number(),
  updated_budget: z.number(),
  company_id: z.string().uuid().optional()
})

export type BudgetResponseType = z.infer<typeof budgetResponseSchema>
