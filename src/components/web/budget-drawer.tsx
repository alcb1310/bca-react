import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { CircleXIcon, EditIcon, PlusIcon, SaveIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { useAppForm } from '@/hooks/formHook'
import { GetAllPartidas } from '@/queries/parametros/budgetItem'
import { GetAllProjects } from '@/queries/parametros/projects'
import { CreateBudget, UpdateBudget } from '@/queries/transacciones/budget'
import {
	type BudgetEditType,
	type BudgetResponseType,
	budgetEditSchema,
} from '@/types/budget'
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

type BudgetUpdateDrawerProps = {
	budget: BudgetResponseType
}

export function BudgetCreateDrawer() {
	const queryClient = useQueryClient()
	const [open, setOpen] = useState(false)
	const { data: projects } = useQuery({
		queryKey: ['proyectos', 'active'],
		queryFn: () => GetAllProjects({ active: true }),
	})
	const { data: budgetItems } = useQuery({
		queryKey: ['partidas'],
		queryFn: () => GetAllPartidas({ accum: false }),
	})

	const useCreateBudgetMutation = useMutation({
		mutationFn: CreateBudget,
		onSuccess: () => {
			setOpen(false)
			toast.success('Presupuesto creado exitosamente')
			queryClient.invalidateQueries({ queryKey: ['presupuesto'] })
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
			budget_item_id: '',
			quantity: 0,
			cost: 0,
			total: 0,
		} as BudgetEditType,
		validators: {
			onSubmit: budgetEditSchema,
			onChange: (data) => {
				const c = Number.parseFloat(data.value.cost.toString())
				const q = Number.parseFloat(data.value.quantity.toString())

				if (Number.isNaN(c) || Number.isNaN(q)) {
					data.value.total = 0
					return
				}

				data.value.total = q * c
			},
		},
		onSubmit: (data) => {
			const dataValue = {
				project_id: data.value.project_id,
				budget_item_id: data.value.budget_item_id,
				quantity: Number.parseFloat(data.value.quantity.toString()),
				cost: Number.parseFloat(data.value.cost.toString()),
				total: Number.parseFloat(data.value.total.toString()),
			}

			useCreateBudgetMutation.mutate({ data: dataValue })
		},
	})

	useEffect(() => {
		if (open) {
			form.reset()
		}
	}, [open, form.reset])

	const proyValues =
		projects?.map((item) => ({
			label: item.name,
			value: item.id as string,
		})) || []
	proyValues.unshift({
		label: 'Seleccione un proyecto',
		value: '',
	})

	const partValues =
		budgetItems?.map((item) => ({
			label: item.name,
			value: item.id as string,
		})) || []
	partValues.unshift({
		label: 'Seleccione una partida',
		value: '',
	})

	return (
		<Drawer direction='right' open={open} onOpenChange={setOpen}>
			<DrawerTrigger asChild>
				<Button variant='default'>
					<PlusIcon size={16} />
					Crear Presupuesto
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
						<DrawerTitle>Crear Presupuesto</DrawerTitle>
						<DrawerDescription>
							Crea una nueva partida presupuestaria
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

							<form.AppField name='budget_item_id'>
								{(field) => (
									<field.SelectField
										label='Partida'
										name='budget_item_id'
										options={partValues}
									/>
								)}
							</form.AppField>

							<form.AppField name='quantity'>
								{(field) => (
									<field.TextField
										name='quantity'
										label='Cantidad'
										placeholder='cant'
									/>
								)}
							</form.AppField>

							<form.AppField name='cost'>
								{(field) => (
									<field.TextField
										name='cost'
										label='Costo'
										placeholder='costo'
									/>
								)}
							</form.AppField>

							<form.AppField name='total'>
								{(field) => (
									<field.TextField
										name='total'
										label='Total'
										placeholder='total'
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

export function BudgetUpdateDrawer({ budget }: BudgetUpdateDrawerProps) {
	const [open, setOpen] = useState(false)
	const queryClient = useQueryClient()

	const useUpdateBudgetMutation = useMutation({
		mutationFn: UpdateBudget,
		onSuccess: () => {
			toast.success('Presupuesto actualizado')
			queryClient.invalidateQueries({ queryKey: ['presupuesto'] })
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
			project_id: budget.project.id,
			budget_item_id: budget.budget_item.id,
			quantity: budget.remaining_quantity.Float64,
			cost: budget.remaining_cost.Float64,
			total: budget.remaining_total,
		} as BudgetEditType,
		validators: {
			onSubmit: budgetEditSchema,
			onChange: (data) => {
				const c = Number.parseFloat(data.value.cost.toString())
				const q = Number.parseFloat(data.value.quantity.toString())

				if (Number.isNaN(c) || Number.isNaN(q)) {
					data.value.total = 0
					return
				}

				data.value.total = q * c
			},
		},
		onSubmit: (data) => {
			const newData = {
				project_id: data.value.project_id,
				budget_item_id: data.value.budget_item_id,
				quantity: Number.parseFloat(data.value.quantity.toString()),
				cost: Number.parseFloat(data.value.cost.toString()),
				total: Number.parseFloat(data.value.total.toString()),
			}

			useUpdateBudgetMutation.mutate({ data: newData })
		},
	})

	const { data: projects } = useQuery({
		queryKey: ['proyectos', 'active'],
		queryFn: () => GetAllProjects({ active: true }),
	})
	const { data: budgetItems } = useQuery({
		queryKey: ['partidas'],
		queryFn: () => GetAllPartidas({ accum: false }),
	})

	useEffect(() => {
		if (open) {
			form.reset()
		}
	}, [open, form.reset])

	const proyValues =
		projects?.map((item) => ({
			label: item.name,
			value: item.id as string,
		})) || []

	const partValues =
		budgetItems?.map((item) => ({
			label: item.name,
			value: item.id as string,
		})) || []

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
						<DrawerTitle>Crear Presupuesto</DrawerTitle>
						<DrawerDescription>
							Crea una nueva partida presupuestaria
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
										disabled
									/>
								)}
							</form.AppField>

							<form.AppField name='budget_item_id'>
								{(field) => (
									<field.SelectField
										label='Partida'
										name='budget_item_id'
										options={partValues}
										disabled
									/>
								)}
							</form.AppField>

							<form.AppField name='quantity'>
								{(field) => (
									<field.TextField
										name='quantity'
										label='Cantidad'
										placeholder='cant'
									/>
								)}
							</form.AppField>

							<form.AppField name='cost'>
								{(field) => (
									<field.TextField
										name='cost'
										label='Costo'
										placeholder='costo'
									/>
								)}
							</form.AppField>

							<form.AppField name='total'>
								{(field) => (
									<field.TextField
										name='total'
										label='Total'
										placeholder='total'
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
