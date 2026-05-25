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

export const quantityCreateSchema = z.object({
	project_id: z.string().uuid({ message: 'Seleccione un proyecto' }),
	rubro_id: z.string().uuid({ message: 'Seleccione un rubro' }),
	quantity: z.custom<number>((val) => {
		const num = Number.parseFloat(val as string)
		return !Number.isNaN(num) || val === ''
	}, 'La cantidad  debe ser un número'),
})

export type QuantityCreateType = z.infer<typeof quantityCreateSchema>
