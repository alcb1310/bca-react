import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import type { ColumnDef } from '@tanstack/react-table'
import { CheckIcon, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { DataTable } from '@/components/ui/data-table'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import PageTitle from '@/components/web/pageTitle'
import {
	CreateProjectDrawer,
	EditProjectDrawer,
} from '@/components/web/projects-drawer'
import { GetAllProjects } from '@/queries/parametros/projects'
import type { ProjectType } from '@/types/project'

export const Route = createFileRoute('/_auth/parametros/proyectos')({
	component: RouteComponent,
	loader: ({ context: { queryClient } }) => {
		queryClient.ensureQueryData({
			queryKey: ['projectos'],
			queryFn: () => GetAllProjects({ data: {} }),
		})
	},
})

function RouteComponent() {
	const queryClient = useQueryClient()
	const [query, setQuery] = useState<string>('')

	const [debounced, setDebounced] = useState<string>(query)
	const { data, isLoading, isFetching } = useSuspenseQuery({
		queryKey: ['proyectos'],
		queryFn: () => GetAllProjects({ data: { query } }),
	})

	useEffect(() => {
		const id = window.setTimeout(() => setDebounced(query), 500)
		return () => window.clearTimeout(id)
	}, [query])

	// biome-ignore lint/correctness/useExhaustiveDependencies(debounced): suppress dependency debounced
	useEffect(() => {
		queryClient.invalidateQueries({ queryKey: ['proyectos'] })
	}, [debounced, queryClient])

	const columns: ColumnDef<ProjectType>[] = [
		{
			header: 'Nombre',
			accessorKey: 'name',
		},
		{
			accessorKey: 'net_area',
			header: 'Area Neta (m2)',
			cell: ({ row }) => {
				const area = row.original.net_area ? row.original.net_area : 0
				return (
					<span className='block w-full text-right'>
						{area.toLocaleString('es-EC', { minimumFractionDigits: 2 })}
					</span>
				)
			},
		},
		{
			accessorKey: 'gross_area',
			header: 'Area Bruta (m2)',
			cell: ({ row }) => {
				const area = row.original.gross_area ? row.original.gross_area : 0
				return (
					<span className='block w-full text-right'>
						{area.toLocaleString('es-EC', { minimumFractionDigits: 2 })}
					</span>
				)
			},
		},
		{
			accessorKey: 'is_active',
			header: 'Activo',
			cell: ({ row }) => {
				return (
					<span className='block w-full text-right'>
						{row.original.is_active ? <CheckIcon size={16} /> : <X size={16} />}
					</span>
				)
			},
		},
		{
			id: 'actions',
			cell: ({ row }) => {
				const project = row.original

				return <EditProjectDrawer project={project} />
			},
		},
	]

	return (
		<div>
			<PageTitle title='Proyectos' />
			{(isLoading || isFetching) && <Spinner />}

			<div className='flex my-3 justify-start gap-4'>
				<CreateProjectDrawer />

				<Input
					placeholder='Buscar'
					value={query}
					onChange={(e) => setQuery(e.target.value)}
				/>
			</div>

			<DataTable data={data} columns={columns} />
		</div>
	)
}
