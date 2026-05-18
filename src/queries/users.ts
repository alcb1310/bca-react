import { authStore } from "@/store/auth";
import type { UserCreate, UserResponse } from "@/types/user";

const URL = import.meta.env.VITE_BACKEND_SERVER;

export async function Me() {
	const token = authStore.get().token;

	const response = await fetch(`${URL}/users/me`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	});

	if (!response.ok) {
		const data = await response.json();
		throw new Error(data.error);
	}

	return (await response.json()) as UserResponse;
}

export async function GetAllUsers() {
	const token = authStore.get().token;

	const response = await fetch(`${URL}/users`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	});

	if (!response.ok) {
		const data = await response.json();
		throw new Error(data.error);
	}

	return (await response.json()) as UserResponse[];
}

export async function CreateUser({ data }: { data: UserCreate }) {
	const token = authStore.get().token;

	const response = await fetch(`${URL}/users`, {
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

export async function DeleteUser(id: string) {
	const token = authStore.get().token;

	const response = await fetch(`${URL}/users/${id}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	});

	if (!response.ok) {
		if (response.status === 403) {
			throw new Error("No tienes permiso para realizar esta acción");
		}

		const data = await response.json();
		throw new Error(data.error);
	}

	return;
}

export async function UpdateUser({ data }: { data: UserResponse }) {
	const token = authStore.get().token;

	const response = await fetch(`${URL}/users/${data.id}`, {
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

export async function UpdatePassword({ data }: { data: { password: string } }) {
	const token = authStore.get().token;

	const response = await fetch(`${URL}/users/password`, {
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
