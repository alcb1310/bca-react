import { authStore } from "@/store/auth";
import type { SupplierCreateType, SupplierType } from "@/types/supplier";

const URL = import.meta.env.VITE_BACKEND_SERVER;

export async function GetAllSuppliers({ search }: { search?: string }) {
	const token = authStore.state.token;

	const params = new URLSearchParams();
	if (search) params.append("query", search);

	const response = await fetch(`${URL}/parametros/proveedores?${params}`, {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	});

	if (!response.ok) {
		throw new Error("Network response was not ok");
	}

	return response.json() as Promise<SupplierType[]>;
}

export async function CreateSupplier({ data }: { data: SupplierCreateType }) {
	const token = authStore.state.token;

	const response = await fetch(`${URL}/parametros/proveedores`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(data),
	});

	if (!response.ok) {
		const data = await response.json();

		throw new Error(data.error);
	}

	return;
}

export async function UpdateSupplier({
	data,
	id,
}: {
	data: SupplierCreateType;
	id: string;
}) {
	const token = authStore.state.token;

	const response = await fetch(`${URL}/parametros/proveedores/${id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(data),
	});

	if (!response.ok) {
		const data = await response.json();

		throw new Error(data.error);
	}
	return;
}
