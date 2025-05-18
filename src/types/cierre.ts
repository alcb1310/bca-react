import { z } from 'zod'

export const cierreSchema = z.object({
  project_id: z.string().uuid('Seleccione un proyecto'),
  date: z.coerce.date({
    message: 'Ingrese una fecha',
  }),
})

export type CierreTypes = z.infer<typeof cierreSchema>
