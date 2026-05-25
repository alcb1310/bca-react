import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import type { ColumnDef } from '@tanstack/react-table'
import { DeleteIcon, EditIcon } from 'lucide-react'
import { DataTable } from '@/components/ui/data-table'
import { Spinner } from '@/components/ui/spinner'
import { CantidadesCreateDrawer } from '@/components/web/cantidades-drawer'
import PageTitle from '@/components/web/pageTitle'
import { GetAllCantidades } from '@/queries/analisis/cantidades'
import type { QuantityResponseType } from '@/types/cantidades'

export const Route = createFileRoute('/_auth/analisis/cantidades')({
	component: RouteComponent,
	loader: ({ context: { queryClient } }) => {
		queryClient.prefetchQuery({
			queryKey: ['cantidades'],
			queryFn: () => GetAllCantidades(),
		})
	},
})

function RouteComponent() {
	const { data, isLoading, isFetching } = useSuspenseQuery({
		queryKey: ['cantidades'],
		queryFn: () => GetAllCantidades(),
	})

	const columns: ColumnDef<QuantityResponseType>[] = [
		{
			accessorKey: 'project.name',
			header: 'Proyecto',
		},
		{
			accessorKey: 'rubro.name',
			header: 'Rubro',
		},
		{
			accessorKey: 'rubro.unit',
			header: 'Unidad',
		},
		{
			accessorKey: 'quantity',
			header: 'Cantidad',
			cell: ({ row }) => {
				const q = row.original.quantity
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
			id: 'actions',
			cell: ({ row }) => {
				return (
					<div className='flex gap-2'>
						<EditIcon size={16} className='cursor-pointer text-yellow-600' />
						<DeleteIcon size={16} className='cursor-pointer text-red-600' />
					</div>
				)
			},
		},
	]

	return (
		<div>
			<PageTitle title='Cantidades' />

			<CantidadesCreateDrawer />

			{(isLoading || isFetching) && <Spinner />}
			<DataTable columns={columns} data={data} />
		</div>
	)
}
