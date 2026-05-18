import { useQuery } from "@tanstack/react-query";
import { CircleXIcon, PlusIcon, SaveIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useAppForm } from "@/hooks/formHook";
import { GetAllCategories } from "@/queries/parametros/categories";
import {
	type MaterialCreateType,
	materialCreateSchema,
} from "@/types/materials";
import { Button } from "../ui/button";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "../ui/drawer";
import { FieldGroup, FieldSet } from "../ui/field";

export function MaterialCreateDrawer() {
	const [open, setOpen] = useState(false);
	const { data } = useQuery({
		queryKey: ["categorias"],
		queryFn: () => GetAllCategories(),
	});

	const form = useAppForm({
		defaultValues: {
			name: "",
			code: "",
			unit: "",
			category_id: "",
		} as MaterialCreateType,
		validators: {
			onSubmit: materialCreateSchema,
		},
		onSubmit: (data) => {
			console.log(data.value);
		},
	});

	useEffect(() => {
		if (open) {
			form.reset();
		}
	}, [open, form.reset]);

	const catValues =
		data?.map((item) => ({
			label: item.name,
			value: item.id as string,
		})) || [];
	catValues.unshift({
		label: "Seleccione una categoria",
		value: "",
	});

	return (
		<Drawer direction="right" open={open} onOpenChange={setOpen}>
			<DrawerTrigger asChild>
				<Button variant="default" className="my-3">
					<PlusIcon size={16} />
					Crear Material
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
						<DrawerTitle>Crear Material</DrawerTitle>
						<DrawerDescription>
							Crea un nuevo material por cada categoria existente
						</DrawerDescription>
					</DrawerHeader>
					<FieldGroup className="my-2 px-4">
						<FieldSet>
							<form.AppField name="code">
								{(field) => (
									<field.TextField
										name="code"
										label="Código"
										placeholder="cod"
									/>
								)}
							</form.AppField>

							<form.AppField name="name">
								{(field) => (
									<field.TextField
										name="name"
										label="Nombre"
										placeholder="Nombre del Material"
									/>
								)}
							</form.AppField>

							<form.AppField name="unit">
								{(field) => (
									<field.TextField
										name="unit"
										label="Unidad"
										placeholder="unidad"
									/>
								)}
							</form.AppField>

							<form.AppField name="category_id">
								{(field) => (
									<field.SelectField
										label="Categoría"
										name="category_id"
										options={catValues}
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
