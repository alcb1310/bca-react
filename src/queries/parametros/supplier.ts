import { store } from "@/redux/store";
import type { SupplierType } from "@/types/supplier";

const URL = import.meta.env.VITE_BACKEND_SERVER;

export async function GetAllSuppliers({ search }: { search?: string }) {
	const state = store.getState();

	const params = new URLSearchParams();
	if (search) params.append("query", search);

	const response = await fetch(`${URL}/parametros/proveedores?${params}`, {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${state.login.token}`,
		},
	});

	if (!response.ok) {
		throw new Error("Network response was not ok");
	}

	return response.json() as Promise<SupplierType[]>;
}

export async function CreateSupplier({ data }: { data: SupplierType }) {
	const state = store.getState();

	const response = await fetch(`${URL}/parametros/proveedores`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${state.login.token}`,
		},
		body: JSON.stringify(data),
	});

	if (!response.ok) {
		const data = await response.json();

		throw new Error(data.error);
	}

	return;
}

export async function UpdateSupplier({ data }: { data: SupplierType }) {
	const state = store.getState();

	const response = await fetch(`${URL}/parametros/proveedores/${data.id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${state.login.token}`,
		},
		body: JSON.stringify(data),
	});

	if (!response.ok) {
		const data = await response.json();

		throw new Error(data.error);
	}
	return;
}
