import { z } from "zod";

export const projectSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1, { message: "El nombre es requerido" }),
  net_area: z.number(),
  gross_area: z.number(),
  is_active: z.boolean(),
})

export type ProjectType = z.infer<typeof projectSchema>
