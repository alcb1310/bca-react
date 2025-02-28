import { z } from 'zod'

export const projectSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1, { message: 'El nombre es requerido' }),
  net_area: z
    .custom<number>((val) => {
      const num = parseFloat(val)
      return !isNaN(num) || val === ''
    }, 'El valor debe ser un número')
    .optional(),
  gross_area: z
    .custom<number>((val) => {
      const num = parseFloat(val)
      return !isNaN(num) || val === ''
    }, 'El valor debe ser un número')
    .optional(),
  is_active: z.boolean(),
})

export type ProjectType = z.infer<typeof projectSchema>
