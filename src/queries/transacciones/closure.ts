import { store } from "@/redux/store";
import type { CierreTypes } from "@/types/cierre";

const URL = import.meta.env.VITE_BACKEND_SERVER;

export async function CreateClosure({ data }: { data: CierreTypes }) {
	const state = store.getState();

	const response = await fetch(`${URL}/transacciones/cierre`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${state.login.token}`,
		},
		body: JSON.stringify(data),
	});

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.error);
	}

	return;
}
