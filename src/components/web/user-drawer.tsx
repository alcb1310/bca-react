import { userCreateSchema, type UserCreate } from "@/types/user";
import { CircleXIcon, PlusIcon, SaveIcon } from "lucide-react";
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
import { Button } from "../ui/button";
import { useAppForm } from "@/hooks/formHook";
import { FieldGroup, FieldSet } from "../ui/field";

export function UserCreateDrawer() {
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
			console.log(data.value);
		},
	});

	return (
		<Drawer direction="right">
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
								<Button variant="secondary">
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
