import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CircleXIcon, EditIcon, PlusIcon, SaveIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { useAppForm } from '@/hooks/formHook'
import { CreateSupplier, UpdateSupplier } from '@/queries/parametros/supplier'
import {
	type SupplierCreateType,
	type SupplierType,
	supplierCreateSchema,
	supplierSchema,
} from '@/types/supplier'
import { Button } from '../ui/button'
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '../ui/drawer'
import { FieldGroup, FieldSet } from '../ui/field'

type EditSupplierDrawerProps = {
	supplier: SupplierType
}

export function SupplierCreateDrawer() {
	const queryClient = useQueryClient()
	const [open, setOpen] = useState(false)

	const useCreateSupplierMutation = useMutation({
		mutationFn: CreateSupplier,
		onSuccess: () => {
			setOpen(false)
			toast.success('Proveedor creado exitosamente')
			queryClient.invalidateQueries({ queryKey: ['proveedores'] })
		},
		onError: (error) => {
			toast.error(error.message, {
				position: 'top-center',
				style: {
					color: 'red',
				},
			})
		},
	})

	const form = useAppForm({
		defaultValues: {
			name: '',
			supplier_id: '',
			contact_email: '',
			contact_name: '',
			contact_phone: '',
		} as SupplierCreateType,
		validators: {
			onSubmit: supplierCreateSchema,
		},
		onSubmit: (data) => {
			useCreateSupplierMutation.mutate({ data: data.value })
		},
	})

	useEffect(() => {
		if (open) {
			form.reset()
		}
	}, [open, form.reset])

	return (
		<Drawer direction='right' open={open} onOpenChange={setOpen}>
			<DrawerTrigger asChild>
				<Button>
					<PlusIcon size={16} />
					Crear Proveedor
				</Button>
			</DrawerTrigger>
			<DrawerContent>
				<form
					onSubmit={(e) => {
						e.preventDefault()
						e.stopPropagation()
						form.handleSubmit()
					}}
				>
					<DrawerHeader>
						<DrawerTitle>Crear Proveedor</DrawerTitle>
						<DrawerDescription>Crea un nuevo proveedor</DrawerDescription>
					</DrawerHeader>
					<FieldGroup className='my-2 px-4'>
						<FieldSet>
							<form.AppField name='name'>
								{(field) => (
									<field.TextField
										name='name'
										label='Nombre'
										placeholder='Nombre del Proveedor'
									/>
								)}
							</form.AppField>

							<form.AppField name='supplier_id'>
								{(field) => (
									<field.TextField
										name='supplier_id'
										label='RUC'
										placeholder='1234567890001'
									/>
								)}
							</form.AppField>

							<form.AppField name='contact_name'>
								{(field) => (
									<field.TextField
										name='contact_name'
										label='Nombre Contacto'
										placeholder='Juan Perez'
									/>
								)}
							</form.AppField>

							<form.AppField name='contact_email'>
								{(field) => (
									<field.TextField
										name='contact_email'
										label='Email contacto'
										placeholder='mail@empresa.com'
									/>
								)}
							</form.AppField>

							<form.AppField name='contact_phone'>
								{(field) => (
									<field.TextField
										name='contact_phone'
										label='Telefono contacto'
										placeholder='0999999999'
									/>
								)}
							</form.AppField>
						</FieldSet>
					</FieldGroup>
					<DrawerFooter>
						<div className='flex justify-start items-center space-x-2'>
							<Button type='submit'>
								<SaveIcon size={10} />
								Guardar
							</Button>
							<DrawerClose asChild>
								<Button type='button' variant='secondary'>
									<CircleXIcon size={10} />
									Cancelar
								</Button>
							</DrawerClose>
						</div>
					</DrawerFooter>
				</form>
			</DrawerContent>
		</Drawer>
	)
}

export function SupplierEditDrawer({ supplier }: EditSupplierDrawerProps) {
	const queryClient = useQueryClient()
	const [open, setOpen] = useState(false)

	const useUpdateSupplierMutation = useMutation({
		mutationFn: UpdateSupplier,
		onSuccess: () => {
			setOpen(false)
			toast.success('Proveedor actualizado exitosamente')
			queryClient.invalidateQueries({ queryKey: ['proveedores'] })
		},
		onError: (error) => {
			toast.error(error.message, {
				position: 'top-center',
				style: {
					color: 'red',
				},
			})
		},
	})

	const form = useAppForm({
		defaultValues: supplier,
		validators: {
			onSubmit: supplierSchema,
		},
		onSubmit: (data) => {
			const edited = {
				name: data.value.name,
				supplier_id: data.value.supplier_id,
				contact_email: data.value.contact_email.String || '',
				contact_name: data.value.contact_name.String || '',
				contact_phone: data.value.contact_phone.String || '',
			}

			useUpdateSupplierMutation.mutate({
				data: {
					data: edited,
					id: supplier.id as string,
				},
			})
		},
	})

	useEffect(() => {
		if (open) {
			form.reset()
		}
	}, [open, form.reset])

	return (
		<Drawer direction='right' open={open} onOpenChange={setOpen}>
			<DrawerTrigger asChild>
				<Button variant='ghost'>
					<EditIcon size={10} className='text-yellow-600' />
				</Button>
			</DrawerTrigger>
			<DrawerContent>
				<form
					onSubmit={(e) => {
						e.preventDefault()
						e.stopPropagation()
						form.handleSubmit()
					}}
				>
					<DrawerHeader>
						<DrawerTitle>Editar Proveedor</DrawerTitle>
						<DrawerDescription>
							Edita la informacion del proveedor seleccionado
						</DrawerDescription>
					</DrawerHeader>
					<FieldGroup className='my-2 px-4'>
						<FieldSet>
							<form.AppField name='name'>
								{(field) => (
									<field.TextField
										name='name'
										label='Nombre'
										placeholder='Nombre del Proveedor'
									/>
								)}
							</form.AppField>

							<form.AppField name='supplier_id'>
								{(field) => (
									<field.TextField
										name='supplier_id'
										label='RUC'
										placeholder='1234567890001'
									/>
								)}
							</form.AppField>

							<form.AppField name='contact_name.String'>
								{(field) => (
									<field.TextField
										name='contact_name.String'
										label='Nombre Contacto'
										placeholder='Juan Perez'
									/>
								)}
							</form.AppField>

							<form.AppField name='contact_email.String'>
								{(field) => (
									<field.TextField
										name='contact_email.String'
										label='Email contacto'
										placeholder='mail@empresa.com'
									/>
								)}
							</form.AppField>

							<form.AppField name='contact_phone.String'>
								{(field) => (
									<field.TextField
										name='contact_phone.String'
										label='Telefono contacto'
										placeholder='0999999999'
									/>
								)}
							</form.AppField>
						</FieldSet>
					</FieldGroup>
					<DrawerFooter>
						<div className='flex justify-start items-center space-x-2'>
							<Button type='submit'>
								<SaveIcon size={10} />
								Guardar
							</Button>
							<DrawerClose asChild>
								<Button type='button' variant='secondary'>
									<CircleXIcon size={10} />
									Cancelar
								</Button>
							</DrawerClose>
						</div>
					</DrawerFooter>
				</form>
			</DrawerContent>
		</Drawer>
	)
}
