import { z } from 'zod'
import { budgetItemSchema } from './partidas'
import { projectSchema } from './project'

export const budgetSchema = z.object({})

export type BudgetType = z.infer<typeof budgetSchema>

export const nullableFloat = z.object({
	Float64: z.number(),
	Valid: z.boolean(),
})

export const budgetResponseSchema = z.object({
	project: projectSchema,
	budget_item: budgetItemSchema,
	initial_quantity: nullableFloat,
	initial_cost: nullableFloat,
	initial_total: z.number(),
	spent_quantity: nullableFloat,
	spent_total: z.number(),
	remaining_quantity: nullableFloat,
	remaining_cost: nullableFloat,
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
