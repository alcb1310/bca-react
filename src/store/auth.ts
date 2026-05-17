import { Store } from "@tanstack/react-store";
import type { LoginResponse } from "@/queries/auth";
export const authStore = new Store<{
	user: LoginResponse["user"] | null;
	token: string;
}>({
	user: null,
	token: "",
});
