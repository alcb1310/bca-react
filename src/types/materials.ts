import { z } from "zod";
import { categorySchema } from "./categories";

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
  category: categorySchema,
})

export type MaterialType = z.infer<typeof materialSchema>;
