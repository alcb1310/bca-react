import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CircleXIcon, PlusIcon, SaveIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useAppForm } from "@/hooks/formHook";
import { CreateCategory } from "@/queries/parametros/categories";
import { type CategoryType, categorySchema } from "@/types/categories";
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

export function CategoryCreateDrawer() {
	const queryClient = useQueryClient();
	const [open, setOpen] = useState(false);

	const useCreateCategoryMutation = useMutation({
		mutationFn: CreateCategory,
		onSuccess: () => {
			setOpen(false);
			toast.success("Categoria creada exitosamente");
			queryClient.invalidateQueries({ queryKey: ["categorias"] });
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
			name: "",
		} as CategoryType,
		validators: {
			onSubmit: categorySchema,
		},
		onSubmit: (data) => {
			useCreateCategoryMutation.mutate({ data: data.value });
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
					<PlusIcon size={16} />
					Crear Categoria
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
						<DrawerTitle>Crear Categoria</DrawerTitle>
						<DrawerDescription>Crear una nueva categoria</DrawerDescription>
					</DrawerHeader>
					<FieldGroup className="my-2 px-4">
						<FieldSet>
							<form.AppField name="name">
								{(field) => (
									<field.TextField
										name="name"
										label="Nombre"
										placeholder="Categoria"
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
