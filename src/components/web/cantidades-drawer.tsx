import { useMutation, useQueries, useQueryClient } from '@tanstack/react-query'
import {
	CircleXIcon,
	DeleteIcon,
	EditIcon,
	PlusIcon,
	SaveIcon,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { useAppForm } from '@/hooks/formHook'
import {
	CreateCantidad,
	DeleteCantidad,
	UpdateCantidad,
} from '@/queries/analisis/cantidades'
import { GetAllProjects } from '@/queries/parametros/projects'
import { GetAllRubros } from '@/queries/parametros/rubros'
import {
	type QuantityCreateType,
	type QuantityEditType,
	type QuantityResponseType,
	quantityCreateSchema,
	quantityEditSchema,
} from '@/types/cantidades'
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
import { FieldGroup, FieldLabel, FieldSet } from '../ui/field'
import { Input } from '../ui/input'
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
} from '../ui/alert-dialog'

type CantidadesEditDrawerProps = {
	cantidad: QuantityResponseType
}

export function CantidadesCreateDrawer() {
	const queryClient = useQueryClient()
	const [open, setOpen] = useState(false)

	const useCreateCantidadesMutation = useMutation({
		mutationFn: CreateCantidad,
		onSuccess: () => {
			toast.success('Cantidad creada exitosamente')
			setOpen(false)
			queryClient.invalidateQueries({ queryKey: ['cantidades'] })
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
			project_id: '',
			rubro_id: '',
			quantity: 0,
		} as QuantityCreateType,
		validators: {
			onSubmit: quantityCreateSchema,
		},
		onSubmit: (data) => {
			const newData = {
				project_id: data.value.project_id,
				rubro_id: data.value.rubro_id,
				quantity: Number.parseFloat(data.value.quantity.toString()),
			}

			useCreateCantidadesMutation.mutate({ data: newData })
		},
	})

	const queries = useQueries({
		queries: [
			{
				queryKey: ['proyectos', 'active'],
				queryFn: () => GetAllProjects({ data: { active: true } }),
			},
			{
				queryKey: ['rubros'],
				queryFn: () => GetAllRubros(),
			},
		],
	})

	useEffect(() => {
		if (open) {
			form.reset()
		}
	}, [open, form.reset])

	const proyValues =
		queries[0].data?.map((item) => ({
			label: item.name,
			value: item.id as string,
		})) || []
	proyValues.unshift({
		label: 'Seleccione un proyecto',
		value: '',
	})

	const itemValues =
		queries[1].data?.map((item) => ({
			label: item.name,
			value: item.id as string,
		})) || []
	itemValues.unshift({
		label: 'Seleccione un rubro',
		value: '',
	})

	return (
		<Drawer direction='right' open={open} onOpenChange={setOpen}>
			<DrawerTrigger asChild>
				<Button variant='default' className='flex my-3 justify-start gap-4'>
					<PlusIcon size={16} />
					Crear Cantidad
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
						<DrawerTitle>Crear Cantidad</DrawerTitle>
						<DrawerDescription>
							Agrega una cantidad de un rubro para un proyecto especifico
						</DrawerDescription>
					</DrawerHeader>
					<FieldGroup className='my-2 px-4'>
						<FieldSet>
							<form.AppField name='project_id'>
								{(field) => (
									<field.SelectField
										label='Proyecto'
										name='project_id'
										options={proyValues}
									/>
								)}
							</form.AppField>

							<form.AppField name='rubro_id'>
								{(field) => (
									<field.SelectField
										label='Rubro'
										name='rubro_id'
										options={itemValues}
									/>
								)}
							</form.AppField>

							<form.AppField name='quantity'>
								{(field) => (
									<field.TextField
										name='quantity'
										label='Cantidad'
										placeholder='cantidad'
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

export function CantidadesEditDrawer({ cantidad }: CantidadesEditDrawerProps) {
	const queryClient = useQueryClient()
	const [open, setOpen] = useState(false)

	const useUpdateCantidadesMutation = useMutation({
		mutationFn: UpdateCantidad,
		onSuccess: () => {
			toast.success('Cantidad actualizada exitosamente')
			setOpen(false)
			queryClient.invalidateQueries({ queryKey: ['cantidades'] })
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
			id: cantidad.id,
			project_id: cantidad.project.id as string,
			rubro_id: cantidad.rubro.id as string,
			quantity: cantidad.quantity,
		} as QuantityEditType,
		validators: {
			onSubmit: quantityEditSchema,
		},
		onSubmit: (data) => {
			const newData = {
				id: data.value.id,
				project_id: data.value.project_id,
				rubro_id: data.value.rubro_id,
				quantity: Number.parseFloat(data.value.quantity.toString()),
			}

			useUpdateCantidadesMutation.mutate({ data: newData })
		},
	})

	useEffect(() => {
		if (open) {
			form.reset()
		}
	}, [open, form.reset])

	return (
		<Drawer direction='right' open={open} onOpenChange={setOpen}>
			<DrawerTrigger>
				<EditIcon size={16} className='cursor-pointer text-yellow-600' />
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
						<DrawerTitle>Editar Cantidad</DrawerTitle>
					</DrawerHeader>
					<FieldGroup className='my-2 px-4'>
						<FieldSet>
							<FieldLabel>Proyecto</FieldLabel>
							<Input value={cantidad.project.name} disabled />

							<FieldLabel>Rubro</FieldLabel>
							<Input value={cantidad.rubro.name} disabled />

							<form.AppField name='quantity'>
								{(field) => (
									<field.TextField
										name='quantity'
										label='Cantidad'
										placeholder='cantidad'
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

export function CantiadesDeleteDialog({ cantidad }: CantidadesEditDrawerProps) {
	const queryClient = useQueryClient()
	const useDeleteCantidadMutation = useMutation({
		mutationFn: DeleteCantidad,
		onSuccess: () => {
			toast.success('Cantidad eliminada exitosamente')
			queryClient.invalidateQueries({ queryKey: ['cantidades'] })
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

	return (
		<AlertDialog>
			<AlertDialogTrigger>
				<DeleteIcon size={16} className='cursor-pointer text-red-600' />
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogMedia className='bg-white'>
						<DeleteIcon size={16} className='bg-white text-red-600' />
					</AlertDialogMedia>
					<AlertDialogTitle className='text-red-600'>
						Eliminar Cantidad
					</AlertDialogTitle>
					<AlertDialogDescription>
						Esta seguro que desea eliminar la cantidad:
						<ul className='my-3'>
							<li className='flex justify-between'>
								<span className='font-bold'>Proyecto</span>{' '}
								{cantidad.project.name}
							</li>
							<li className='flex justify-between'>
								<span className='font-bold'>Rubro</span> {cantidad.rubro.name}
							</li>
						</ul>
						Esta accion no se puede deshacer
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel asChild>
						<Button type='button' variant='outline'>
							Cancelar
						</Button>
					</AlertDialogCancel>
					<AlertDialogAction
						onClick={() => {
							useDeleteCantidadMutation.mutate({ data: { id: cantidad.id } })
						}}
					>
						Eliminar
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
