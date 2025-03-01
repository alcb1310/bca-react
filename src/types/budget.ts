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
    project_id: z.string().uuid({ message: 'Seleccione un proyecto' }),
    budget_item_id: z.string().uuid({ message: 'Seleccione una partida' }),
    quantity: z.coerce.number({ message: 'La cantidad debe ser un número' }),
    cost: z.coerce.number({ message: 'El costo debe ser un número' }),
    total: z.coerce.number({ message: 'El total debe ser un número' }).optional(),
})

export type BudgetEditType = z.infer<typeof budgetEditSchema>
