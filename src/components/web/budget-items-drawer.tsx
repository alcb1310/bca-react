import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { CircleXIcon, EditIcon, PlusIcon, SaveIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { useAppForm } from '@/hooks/formHook'
import { CreatePartida, GetAllPartidas } from '@/queries/parametros/budgetItem'
import {
	type BudgetItem,
	type BudgetItemResponse,
	budgetItemResponseShema,
	budgetItemSchema,
} from '@/types/partidas'
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

type PartidaEditDrawerProps = {
	partida: BudgetItemResponse
}

export function PartidaCreateDrawer() {
	const queryClient = useQueryClient()
	const [open, setOpen] = useState(false)
	const { data: partidas } = useQuery({
		queryKey: ['partidas', 'accum'],
		queryFn: () =>
			GetAllPartidas({
				accum: true,
			}),
	})

	const useCreatePartidaMutation = useMutation({
		mutationFn: CreatePartida,
		onSuccess: () => {
			setOpen(false)
			toast.success('Partida creada exitosamente')
			queryClient.invalidateQueries({ queryKey: ['partidas'] })
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
			code: '',
			accumulate: false,
			parent_id: '',
		} as BudgetItem,
		validators: {
			onSubmit: budgetItemSchema,
		},
		onSubmit: (data) => {
			useCreatePartidaMutation.mutate({ data: data.value })
		},
	})

	const budgetItemValues =
		partidas?.map((item) => ({
			label: item.name,
			value: item.id as string,
		})) || []
	budgetItemValues.unshift({
		label: 'Seleccione una partida',
		value: '',
	})

	useEffect(() => {
		if (open) {
			form.reset()
		}
	}, [open, form.reset])

	return (
		<Drawer direction='right' open={open} onOpenChange={setOpen}>
			<DrawerTrigger>
				<Button>
					<PlusIcon size={16} />
					Crear Partida
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
						<DrawerTitle>Crear partida</DrawerTitle>
						<DrawerDescription>Crea una nueva partida</DrawerDescription>
					</DrawerHeader>
					<FieldGroup className='my-2 px-4'>
						<FieldSet>
							<form.AppField name='code'>
								{(field) => (
									<field.TextField
										name='code'
										label='Código'
										placeholder='codigo'
									/>
								)}
							</form.AppField>

							<form.AppField name='name'>
								{(field) => (
									<field.TextField
										name='name'
										label='Nombre'
										placeholder='Nombre de la Partida'
									/>
								)}
							</form.AppField>

							<form.AppField name='parent_id'>
								{(field) => (
									<field.SelectField
										label='Partida padre'
										name='parent_id'
										options={budgetItemValues}
									/>
								)}
							</form.AppField>

							<form.AppField name='accumulate'>
								{(field) => (
									<field.SwitchField name='accumulate' label='Acumula' />
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

export function PartidaEditDrawer({ partida }: PartidaEditDrawerProps) {
	const [open, setOpen] = useState(false)

	const form = useAppForm({
		defaultValues: partida,
		validators: {
			onSubmit: budgetItemResponseShema,
		},
		onSubmit: (data) => {
			console.log(data.value)
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
				<Button variant='ghost'>
					<EditIcon className='inline-block text-yellow-600' />
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
						<DrawerTitle>Crear partida</DrawerTitle>
						<DrawerDescription>Crea una nueva partida</DrawerDescription>
					</DrawerHeader>
					<FieldGroup className='my-2 px-4'>
						<FieldSet>
							<form.AppField name='code'>
								{(field) => (
									<field.TextField
										name='code'
										label='Código'
										placeholder='codigo'
									/>
								)}
							</form.AppField>

							<form.AppField name='name'>
								{(field) => (
									<field.TextField
										name='name'
										label='Nombre'
										placeholder='Nombre de la Partida'
									/>
								)}
							</form.AppField>

							<form.AppField name='parent.name'>
								{(field) => (
									<field.TextField
										label='Partida padre'
										name='parent.name'
										disabled
									/>
								)}
							</form.AppField>

							<form.AppField name='accumulate'>
								{(field) => (
									<field.SwitchField
										name='accumulate'
										label='Acumula'
										disabled
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
