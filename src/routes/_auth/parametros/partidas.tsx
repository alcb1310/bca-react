import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import type { ColumnDef } from '@tanstack/react-table'
import { CheckIcon, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { DataTable } from '@/components/ui/data-table'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import {
	PartidaCreateDrawer,
	PartidaEditDrawer,
} from '@/components/web/budget-items-drawer'
import PageTitle from '@/components/web/pageTitle'
import { GetAllPartidas } from '@/queries/parametros/budgetItem'
import type { BudgetItemResponse } from '@/types/partidas'

export const Route = createFileRoute('/_auth/parametros/partidas')({
	component: RouteComponent,
	loader: ({ context: { queryClient } }) => {
		queryClient.ensureQueryData({
			queryKey: ['partidas'],
			queryFn: () => GetAllPartidas({}),
		})
	},
})

function RouteComponent() {
	const queryClient = useQueryClient()
	const [search, setSearch] = useState<string>('')
	const [debounced, setDebounced] = useState<string>(search)

	const { data, isLoading, isFetching } = useSuspenseQuery({
		queryKey: ['partidas'],
		queryFn: () => GetAllPartidas({ query: search }),
	})

	const columns: ColumnDef<BudgetItemResponse>[] = [
		{
			accessorKey: 'code',
			header: 'Codigo',
		},
		{
			accessorKey: 'name',
			header: 'Nombre',
		},
		{
			accessorKey: 'level',
			header: 'Nivel',
		},
		{
			accessorKey: 'accumulate',
			header: 'Acumula',
			cell: ({ row }) => {
				return (
					<span className='block w-full text-right'>
						{row.original.accumulate ? (
							<CheckIcon size={16} />
						) : (
							<X size={16} />
						)}
					</span>
				)
			},
		},
		{
			accessorKey: 'parent',
			header: 'Padre',
			cell: ({ row }) => {
				return <span>{row.original.parent?.code}</span>
			},
		},
		{
			id: 'actions',
			cell: ({ row }) => {
				const partida = row.original

				return <PartidaEditDrawer partida={partida} />
			},
		},
	]

	useEffect(() => {
		const id = window.setTimeout(() => setDebounced(search), 500)
		return () => window.clearTimeout(id)
	}, [search])

	// biome-ignore lint/correctness/useExhaustiveDependencies(debounced): suppress dependency debounced
	useEffect(() => {
		queryClient.invalidateQueries({ queryKey: ['partidas'] })
	}, [debounced, queryClient])

	return (
		<div>
			<PageTitle title='Partidas' />
			<div className='flex my-3 justify-start gap-4'>
				<PartidaCreateDrawer />

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
