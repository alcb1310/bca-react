import { z } from "zod"

export const createSupplier = z.object({
    uuid: z.string().optional(),
    ruc: z.string().min(6).max(50),
    name: z.string().mmin(4).max(255),
    contactName: z.string().optional().max(255),
    contactEmail: z.string().optional().max(255),
    contactPhone: z.string().optional().max(255),
})

export type CreateSupplierType = z.infer<typeof createSupplier>

export type Supplier = {
    uuid: string,
    ruc: string,
    name: string,
    contactName: string | undefined | null,
    contactEmail: string | undefined | null,
    contactPhone: string | undefined | null
}
