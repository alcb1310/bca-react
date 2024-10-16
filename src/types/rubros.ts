import { z } from 'zod'

export const rubrosSchema = z.object({
  id: z.string().uuid().optional(),
  code: z.string().min(1, 'Código es obligatorio'),
  name: z.string().min(1, 'Nombre es obligatorio'),
  unit: z.string().min(1, 'Unidad es obligatorio'),
})

export type RubrosType = z.infer<typeof rubrosSchema>
