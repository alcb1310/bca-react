import { z } from "zod";

export const optionalStringSchema = z.object({
	String: z.string().nullable(),
	Valid: z.boolean(),
});

export const supplierSchema = z.object({
	id: z.string().uuid().optional(),
	supplier_id: z
		.string()
		.min(1, "Ruc del proveedor es obligatorio")
		.min(10, "Ruc inválido"),
	name: z.string().min(1, "Nombre es obligatorio"),
	contact_name: optionalStringSchema,
	contact_phone: optionalStringSchema,
	contact_email: optionalStringSchema,
});

export type SupplierType = z.infer<typeof supplierSchema>;
