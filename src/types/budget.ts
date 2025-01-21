import { z } from 'zod'
import { projectSchema } from './project'
import { budgetItemSchema } from './partidas'

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
    company_id: z.string().uuid().optional(),
})

export type BudgetResponseType = z.infer<typeof budgetResponseSchema>

export const budgetEditSchema = z.object({
    project_id: z.string().uuid(),
    budget_item_id: z.string().uuid(),
    quantity: z.custom<number>((val) => {
        const num = parseFloat(val)
        return !isNaN(num)
    }, 'La cantidad deber ser un  número'),
    cost: z.custom<number>((val) => {
        const num = parseFloat(val)
        return !isNaN(num)
    }, 'El costo deber ser un  número'),
    total: z.custom<number>((val) => {
        const num = parseFloat(val)
        return !isNaN(num)
    }, 'El costo deber ser un  número'),
})

export type BudgetEditType = z.infer<typeof budgetEditSchema>
