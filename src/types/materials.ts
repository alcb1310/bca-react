import { z } from "zod";

export const materialSchema = z.object({
  id: z.string().uuid().optional(),
  code: z
    .string()
    .min(1, "Código es obligatorio"),
  name: z
    .string()
    .min(1, "Nombre es obligatorio"),
  unit: z
    .string()
    .min(1, "Unidad es obligatorio"),
  category: z.object({
    id: z.string().uuid("Seleccione una categoría"),
    name: z.string().optional()
  }),
})

export type MaterialType = z.infer<typeof materialSchema>;
