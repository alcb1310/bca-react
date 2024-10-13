import { z } from "zod"

export const categorySchema = z.object({
  id: z.string().uuid().optional(),
  name: z
    .string()
    .min(1, "Categoría es obligatoria"),
})

export type CategoryType = z.infer<typeof categorySchema>;
