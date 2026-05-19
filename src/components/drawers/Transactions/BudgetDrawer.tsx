import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Typography } from '@mui/material'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { toast } from 'sonner'
import ButtonGroup from '@/components/buttons/button-group'
import BcaDrawer from '@/components/drawers/BcaDrawer/BcaDrawer'
import BcaSelect from '@/components/input/BcaSelect'
import BcaTextField from '@/components/input/BcaTextField'
import DrawerTitle from '@/components/titles/DrawerTitle'
import { GetAllBudgetItems } from '@/queries/parametros/budgetItem'
import { GetAllProjects } from '@/queries/parametros/projects'
import { CreateBudget, UpdateBudget } from '@/queries/transacciones/budget'
import { type BudgetEditType, budgetEditSchema } from '@/types/budget'
import { calculateTotal } from '@/utils/math'

type BudgetDrawerProps = {
	open: boolean
	onClose: () => void
	defaultValues: BudgetEditType
}

export default function BudgetDrawer({
	open,
	onClose,
	defaultValues,
}: BudgetDrawerProps) {
	const queryClient = useQueryClient()
	const [conflictError, setConflictError] = useState<string>('')
	const { control, reset, handleSubmit } = useForm<BudgetEditType>({
		defaultValues,
		resolver: zodResolver(budgetEditSchema),
	})

	const results = useWatch({ control })
	const total = calculateTotal(results.quantity, results.cost)

	const { data: projects } = useQuery({
		queryKey: ['projects'],
		queryFn: () => GetAllProjects({ active: true }),
	})

	const { data: budgetItems } = useQuery({
		queryKey: ['partidas'],
		queryFn: () => GetAllBudgetItems({ accum: false }),
	})

	const createBudgetMutation = useMutation({
		mutationFn: CreateBudget,
		onSuccess: () => {
			onClose()
			toast.success('Presupuesto creado exitosamente')
		},
		onError: (error) => {
			setConflictError(error.message)
			toast.error(`Error al crear el presupuesto: ${error.message}`)
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ['budget'] })
		},
	})

	const updateBudgetMutation = useMutation({
		mutationFn: UpdateBudget,
		onSuccess: () => {
			onClose()
			toast.success('Presupuesto actualizado exitosamente')
		},
		onError: (error) => {
			setConflictError(error.message)
			toast.error(`Error al actualizar el presupuesto: ${error.message}`)
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ['budget'] })
		},
	})

	useEffect(() => {
		reset(defaultValues)
		setConflictError('')
	}, [reset, defaultValues])

	async function hadleSubmit(data: BudgetEditType) {
		const costo = Number.parseFloat(data.cost?.toString() || '0')
		const cantidad = Number.parseFloat(data.quantity?.toString() || '0')

		const dataToSave = {
			project_id: data.project_id,
			budget_item_id: data.budget_item_id,
			quantity: cantidad,
			cost: costo,
			total: cantidad * costo,
		}

		if (!defaultValues.project_id) {
			createBudgetMutation.mutate({ data: dataToSave })
			return
		}

		updateBudgetMutation.mutate({ data: dataToSave })
	}

	return (
		<>
			<BcaDrawer open={open} onClose={onClose}>
				<DrawerTitle
					title={
						defaultValues?.project_id
							? 'Editar Presupuesto'
							: 'Crear Presupuesto'
					}
					close={onClose}
				/>

				<Box mt={2}>
					<form
						className='w-full flex flex-col gap-5'
						onSubmit={handleSubmit(hadleSubmit)}
					>
						{conflictError && (
							<Typography color='error'>{conflictError}</Typography>
						)}
						<BcaSelect
							datatestid='component.drawer.budget.project'
							control={control}
							name='project_id'
							label='Proyectos'
							disabled={!!defaultValues?.project_id}
						>
							<option value=''>Seleccione un proyecto</option>
							{projects?.map((project) => (
								<option key={project.id} value={project.id}>
									{project.name}
								</option>
							))}
						</BcaSelect>

						<BcaSelect
							datatestid='component.drawer.budget.budget_item'
							control={control}
							name='budget_item_id'
							label='Partida'
							disabled={!!defaultValues?.budget_item_id}
						>
							<option value=''>Seleccione una partida</option>
							{budgetItems?.map((budgetItem) => (
								<option key={budgetItem.id} value={budgetItem.id}>
									{budgetItem.name}
								</option>
							))}
						</BcaSelect>

						<BcaTextField
							name='quantity'
							datatestid='component.drawer.budget.quantity'
							label='Cantidad'
							control={control}
						/>
						<BcaTextField
							name='cost'
							label='Costo'
							datatestid='component.drawer.budget.cost'
							control={control}
						/>
						<BcaTextField
							datatestid='component.drawer.budget.total'
							name='total'
							label='Total'
							control={control}
							value={total}
							disabled
						/>

						<ButtonGroup
							saveFunction={handleSubmit(hadleSubmit)}
							cancelFunction={onClose}
						/>
					</form>
				</Box>
			</BcaDrawer>
			<DevTool control={control} />
		</>
	)
}
