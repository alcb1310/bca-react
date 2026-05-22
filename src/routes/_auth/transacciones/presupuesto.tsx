import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import type { ColumnDef } from '@tanstack/react-table'
import { EditIcon, PlusIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import { Input } from '@/components/ui/input'
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select'
import { Spinner } from '@/components/ui/spinner'
import {
	BudgetCreateDrawer,
	BudgetDeleteDrawer,
} from '@/components/web/budget-drawer'
import PageTitle from '@/components/web/pageTitle'
import { GetAllProjects } from '@/queries/parametros/projects'
import { GetAllBudgets } from '@/queries/transacciones/budget'
import type { BudgetResponseType } from '@/types/budget'

export const Route = createFileRoute('/_auth/transacciones/presupuesto')({
	component: RouteComponent,
	loader: ({ context: { queryClient } }) => {
		Promise.all([
			queryClient.prefetchQuery({
				queryKey: ['proyectos'],
				queryFn: () => GetAllProjects({ active: true }),
			}),
			queryClient.prefetchQuery({
				queryKey: ['presupuesto'],
				queryFn: () => GetAllBudgets({}),
			}),
		])
	},
})

function RouteComponent() {
	const queryClient = useQueryClient()
	const [search, setSearch] = useState<string>('')
	const [project, setProject] = useState<string>('')
	const [debounced, setDebounced] = useState<string>(search)

	const { data, isLoading, isFetching } = useSuspenseQuery({
		queryKey: ['presupuesto'],
		queryFn: () => GetAllBudgets({ query: search, project: project }),
	})

	const { data: activeProjects } = useSuspenseQuery({
		queryKey: ['proyectos'],
		queryFn: () => GetAllProjects({ active: true }),
	})

	const columns: ColumnDef<BudgetResponseType>[] = [
		{
			accessorKey: 'project.name',
			header: 'Proyecto',
		},
		{
			accessorKey: 'budget_item.name',
			header: 'Partida',
		},
		{
			accessorKey: 'spent_total',
			header: 'Gastado',
			cell: ({ row }) => {
				return (
					<span className='block w-full text-right'>
						{row.original.spent_total.toLocaleString('es-EC', {
							minimumFractionDigits: 2,
						})}
					</span>
				)
			},
		},
		{
			accessorKey: 'remaining_quantity',
			header: 'Cantidad',
			cell: ({ row }) => {
				const q = row.original.remaining_quantity

				return (
					<span className='block w-full text-right'>
						{q.Valid
							? q.Float64.toLocaleString('es-EC', {
									minimumFractionDigits: 2,
									maximumFractionDigits: 2,
								})
							: ''}
					</span>
				)
			},
		},
		{
			accessorKey: 'remaining_cost',
			header: 'Costo',
			cell: ({ row }) => {
				const q = row.original.remaining_cost

				return (
					<span className='block w-full text-right'>
						{q.Valid
							? q.Float64.toLocaleString('es-EC', {
									minimumFractionDigits: 2,
									maximumFractionDigits: 2,
								})
							: ''}
					</span>
				)
			},
		},
		{
			accessorKey: 'remaining_total',
			header: 'Total',
			cell: ({ row }) => {
				const q = row.original.remaining_total

				return (
					<span className='block w-full text-right'>
						{q.toLocaleString('es-EC', {
							minimumFractionDigits: 2,
							maximumFractionDigits: 2,
						})}
					</span>
				)
			},
		},
		{
			accessorKey: 'updated_budget',
			header: 'Presupuesto',
			cell: ({ row }) => {
				const q = row.original.updated_budget

				return (
					<span className='block w-full text-right'>
						{q.toLocaleString('es-EC', {
							minimumFractionDigits: 2,
							maximumFractionDigits: 2,
						})}
					</span>
				)
			},
		},
		{
			id: 'Actions',
			cell: ({ row }) => {
				const budget = row.original
				return (
					<>
						{!budget.budget_item.accumulate && (
							<BudgetDeleteDrawer budget={budget} />
						)}
					</>
				)
			},
		},
	]

	useEffect(() => {
		const id = window.setTimeout(() => setDebounced(search), 500)
		return () => window.clearTimeout(id)
	}, [search])

	useEffect(() => {
		setDebounced(project)
	}, [project])

	// biome-ignore lint/correctness/useExhaustiveDependencies(debounced): suppress dependency debounced
	useEffect(() => {
		queryClient.invalidateQueries({ queryKey: ['presupuesto'] })
	}, [debounced, queryClient])

	const proyValues =
		activeProjects?.map((item) => ({
			label: item.name,
			value: item.id as string,
		})) || []
	proyValues.unshift({
		label: 'Proyecto',
		value: '',
	})

	return (
		<div>
			<PageTitle title='Presupuesto' />
			<div className='flex my-3 justify-start gap-4'>
				<BudgetCreateDrawer />

				<NativeSelect
					name={'proyectos'}
					size='default'
					value={project}
					onChange={(e) => {
						setProject(e.target.value)
					}}
				>
					{proyValues.map((option) => (
						<NativeSelectOption key={option.value} value={option.value}>
							{option.label}
						</NativeSelectOption>
					))}
				</NativeSelect>

				<Input
					placeholder='Buscar'
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
			</div>
			{(isLoading || isFetching) && <Spinner />}
			<DataTable columns={columns} data={data} />
		</div>
	)
}
