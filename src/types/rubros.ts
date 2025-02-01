import { z } from 'zod'

export const rubrosSchema = z.object({
    id: z.string().uuid().optional(),
    code: z.string({ message: 'Código es obligatorio' }),
    name: z.string({ message: 'Nombre es obligatorio' }),
    unit: z.string({ message: 'Unidad es obligatorio' }),
})

export type RubrosType = z.infer<typeof rubrosSchema>
