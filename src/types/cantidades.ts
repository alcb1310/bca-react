import z from 'zod'
import { projectSchema } from './project'
import { rubrosSchema } from './rubros'

export const quantityResponseSchema = z.object({
	id: z.string().uuid(),
	project: projectSchema,
	rubro: rubrosSchema,
	quantity: z.number(),
	company_id: z.string().uuid().optional(),
})

export type QuantityResponseType = z.infer<typeof quantityResponseSchema>
