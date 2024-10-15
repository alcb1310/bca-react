import { z } from "zod";

export const itemMaterialSchema = z.object({
  item_id: z.string().uuid("Seleccione un rubro"),
  material_id: z.string().uuid("Seleccione un material"),
  quantity: z.custom<number>((val) => {
    const num = parseFloat(val)
    return !isNaN(num)
  }, "La cantidad deber ser un  número")
})

export type ItemMaterialType = z.infer<typeof itemMaterialSchema>

