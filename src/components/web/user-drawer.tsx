import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	CircleXIcon,
	DeleteIcon,
	EditIcon,
	PlusIcon,
	SaveIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { useAppForm } from "@/hooks/formHook";
import {
	CreateUser,
	DeleteUser,
	UpdatePassword,
	UpdateUser,
} from "@/queries/users";
import {
	type UserCreate,
	type UserResponse,
	userCreateSchema,
	userResponseSchema,
} from "@/types/user";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogMedia,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";
import { FieldGroup, FieldSet } from "../ui/field";

type EditUserDrawerProps = {
	user: UserResponse;
};

export function UserCreateDrawer() {
	const queryClient = useQueryClient();

	const [open, setOpen] = useState(false);

	const useCreateUserMutation = useMutation({
		mutationFn: CreateUser,
		onSuccess: () => {
			setOpen(false);
			toast.success("Usuario creado exitosamente");
			queryClient.invalidateQueries({ queryKey: ["usuarios"] });
		},
		onError: (error) => {
			toast.error(error.message, {
				position: "top-center",
				style: {
					color: "red",
				},
			});
		},
	});

	const form = useAppForm({
		defaultValues: {
			email: "",
			password: "",
			name: "",
		} satisfies UserCreate as UserCreate,
		validators: {
			onSubmit: userCreateSchema,
		},
		onSubmit: (data) => {
			useCreateUserMutation.mutate({ data: data.value });
		},
	});

	useEffect(() => {
		if (open) {
			form.reset();
		}
	}, [open, form.reset]);

	return (
		<Drawer direction="right" open={open} onOpenChange={setOpen}>
			<DrawerTrigger asChild>
				<Button variant="default" className="my-3">
					<PlusIcon />
					Crear Usuario
				</Button>
			</DrawerTrigger>
			<DrawerContent>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						e.stopPropagation();
						form.handleSubmit();
					}}
				>
					<DrawerHeader>
						<DrawerTitle>Crear Usuario</DrawerTitle>
						<DrawerDescription>Crear un nuevo usuario</DrawerDescription>
					</DrawerHeader>
					<FieldGroup className="my-2 px-4">
						<FieldSet>
							<form.AppField name="name">
								{(field) => (
									<field.TextField
										name="name"
										label="Nombre"
										placeholder="Juan Perez"
									/>
								)}
							</form.AppField>

							<form.AppField name="email">
								{(field) => (
									<field.TextField
										name="email"
										label="Email"
										placeholder="usuario@correo.com"
									/>
								)}
							</form.AppField>

							<form.AppField name="password">
								{(field) => (
									<field.TextField
										label="Contraseña"
										type="password"
										name="password"
										placeholder="*******"
									/>
								)}
							</form.AppField>
						</FieldSet>
					</FieldGroup>
					<DrawerFooter>
						<div className="flex justify-start items-center space-x-2">
							<Button type="submit">
								<SaveIcon size={10} />
								Guardar
							</Button>
							<DrawerClose>
								<Button type="button" variant="secondary">
									<CircleXIcon size={10} />
									Cancelar
								</Button>
							</DrawerClose>
						</div>
					</DrawerFooter>
				</form>
			</DrawerContent>
		</Drawer>
	);
}

export function UserEditDrawer({ user }: EditUserDrawerProps) {
	const queryClient = useQueryClient();

	const [open, setOpen] = useState(false);

	const useEditUserMutation = useMutation({
		mutationFn: UpdateUser,
		onSuccess: () => {
			setOpen(false);
			toast.success("Usuario actualizado exitosamente");
			queryClient.invalidateQueries({ queryKey: ["usuarios"] });
		},
		onError: (error) => {
			toast.error(error.message, {
				position: "top-center",
				style: {
					color: "red",
				},
			});
		},
	});

	const form = useAppForm({
		defaultValues: {
			id: user.id,
			email: user.email,
			name: user.name,
			company_id: user.company_id,
		} satisfies UserResponse as UserResponse,
		validators: {
			onSubmit: userResponseSchema,
		},
		onSubmit: (data) => {
			useEditUserMutation.mutate({ data: data.value });
		},
	});

	useEffect(() => {
		if (open) {
			form.reset();
		}
	}, [open, form.reset]);

	return (
		<Drawer direction="right" open={open} onOpenChange={setOpen}>
			<DrawerTrigger asChild>
				<Button variant="ghost">
					<EditIcon size={10} className="text-yellow-600" />
				</Button>
			</DrawerTrigger>
			<DrawerContent>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						e.stopPropagation();
						form.handleSubmit();
					}}
				>
					<DrawerHeader>
						<DrawerTitle>Editar Usuario</DrawerTitle>
						<DrawerDescription>Edita el usuario seleccionado</DrawerDescription>
					</DrawerHeader>
					<form.AppField name="id">
						{(field) => (
							<field.TextField type="hidden" name="id" label="" disabled />
						)}
					</form.AppField>
					<form.AppField name="company_id">
						{(field) => (
							<field.TextField
								type="hidden"
								name="company_id"
								label=""
								disabled
							/>
						)}
					</form.AppField>

					<FieldGroup className="my-2 px-4">
						<FieldSet>
							<form.AppField name="name">
								{(field) => (
									<field.TextField
										name="name"
										label="Nombre"
										placeholder="Juan Perez"
									/>
								)}
							</form.AppField>

							<form.AppField name="email">
								{(field) => (
									<field.TextField
										name="email"
										label="Email"
										placeholder="usuario@correo.com"
									/>
								)}
							</form.AppField>
						</FieldSet>
					</FieldGroup>
					<DrawerFooter>
						<div className="flex justify-start items-center space-x-2">
							<Button type="submit">
								<SaveIcon size={10} />
								Guardar
							</Button>
							<DrawerClose asChild>
								<Button type="button" variant="secondary">
									<CircleXIcon size={10} />
									Cancelar
								</Button>
							</DrawerClose>
						</div>
					</DrawerFooter>
				</form>
			</DrawerContent>
		</Drawer>
	);
}

export function UserDeleteDialog({ user }: EditUserDrawerProps) {
	const queryClient = useQueryClient();

	const useDeleteUserMutation = useMutation({
		mutationFn: DeleteUser,
		onSuccess: () => {
			toast.success("Usuario eliminado exitosamente");
			queryClient.invalidateQueries({ queryKey: ["usuarios"] });
		},
		onError: (error) => {
			toast.error(error.message, {
				position: "top-center",
				style: {
					color: "red",
				},
			});
		},
	});

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<DeleteIcon size={16} className="text-red-600" />
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogMedia className="bg-white">
						<DeleteIcon size={16} className="bg-white text-red-600" />
					</AlertDialogMedia>
					<AlertDialogTitle className="text-red-600">
						Eliminar Usuario
					</AlertDialogTitle>
					<AlertDialogDescription>
						¿Estás seguro de eliminar el usuario {user.name}?. Esta acción no se
						puede deshacer
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancelar</AlertDialogCancel>
					<AlertDialogAction
						onClick={() => {
							useDeleteUserMutation.mutate(user.id);
						}}
					>
						Eliminar
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}

export function UserChangePasswordDialog() {
	const useUpdatePasswordMutation = useMutation({
		mutationFn: UpdatePassword,
		onSuccess: () => {
			toast.success("Contraseña actualizada exitosamente");
		},
		onError: (error) => {
			toast.error(error.message, {
				position: "top-center",
				style: {
					color: "red",
				},
			});
		},
	});

	const form = useAppForm({
		defaultValues: {
			password: "",
		},
		validators: {
			onSubmit: z.object({
				password: z
					.string()
					.min(6, "La contraseña debe tener al menos 6 caracteres"),
			}),
		},
		onSubmit: (data) => {
			useUpdatePasswordMutation.mutate({ data: data.value });
		},
	});

	useEffect(() => {
		form.reset();
	}, [form.reset]);

	return (
		<Dialog>
			<DialogTrigger className="my-2 px-2 text-xs hover:bg-accent">
				Cambiar Contraseña
			</DialogTrigger>
			<DialogContent>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						e.stopPropagation();
						form.handleSubmit();
					}}
				>
					<DialogHeader>
						<DialogTitle>Cambiar Contraseña</DialogTitle>
						<DialogDescription>
							Cambia la contraseña del usuario
						</DialogDescription>
					</DialogHeader>
					<FieldGroup className="my-2 px-4">
						<FieldSet>
							<form.AppField name="password">
								{(field) => (
									<field.TextField
										label="Contraseña"
										type="password"
										name="password"
										placeholder="*******"
									/>
								)}
							</form.AppField>
						</FieldSet>
					</FieldGroup>

					<DialogFooter>
						<DialogClose asChild>
							<Button type="button" variant="outline">
								Cancelar
							</Button>
						</DialogClose>
						<DialogClose asChild>
							<Button type="submit">Guardar</Button>
						</DialogClose>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
