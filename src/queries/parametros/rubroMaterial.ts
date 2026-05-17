import { store } from "@/redux/store";
import type {
	RubroMaterialResponseTye,
	RubroMaterialType,
} from "@/types/rubro-material";

const URL = import.meta.env.VITE_BACKEND_SERVER;

export async function GetAllRubrosMaterials(rubroId: string) {
	const state = store.getState();

	const response = await fetch(
		`${URL}/parametros/rubros/${rubroId}/materiales`,
		{
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${state.login.token}`,
			},
		},
	);

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error);
	}

	return response.json() as Promise<RubroMaterialResponseTye[]>;
}

export async function CreateRubroMaterial({
	data,
}: {
	data: RubroMaterialType;
}) {
	const state = store.getState();

	const response = await fetch(
		`${URL}/parametros/rubros/${data.item_id}/materiales`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${state.login.token}`,
			},
			body: JSON.stringify(data),
		},
	);

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error);
	}

	return;
}

export async function UpdateRubroMaterial({
	data,
}: {
	data: RubroMaterialType;
}) {
	const state = store.getState();

	const response = await fetch(
		`${URL}/parametros/rubros/${data.item_id}/materiales/${data.material_id}`,
		{
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${state.login.token}`,
			},
			body: JSON.stringify(data),
		},
	);

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error);
	}

	return;
}

export async function DeleteRubroMaterial({
	rubroId,
	materialId,
}: {
	rubroId: string;
	materialId: string;
}) {
	const state = store.getState();

	const response = await fetch(
		`${URL}/parametros/rubros/${rubroId}/materiales/${materialId}`,
		{
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${state.login.token}`,
			},
		},
	);

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error);
	}

	return;
}
