import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import type { ColumnDef } from '@tanstack/react-table'
import { EditIcon, PlusIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import { Spinner } from '@/components/ui/spinner'
import {
	MaterialCreateDrawer,
	MaterialEditDrawer,
} from '@/components/web/material-drawer'
import PageTitle from '@/components/web/pageTitle'
import { GetAllMaterials } from '@/queries/parametros/materials'
import type { MaterialType } from '@/types/materials'

export const Route = createFileRoute('/_auth/parametros/materiales')({
	component: RouteComponent,
	loader: ({ context: { queryClient } }) => {
		queryClient.ensureQueryData({
			queryKey: ['materiales'],
			queryFn: () => GetAllMaterials(),
		})
	},
})

function RouteComponent() {
	const { data, isLoading } = useSuspenseQuery({
		queryKey: ['materiales'],
		queryFn: () => GetAllMaterials(),
	})

	const columns: ColumnDef<MaterialType>[] = [
		{
			accessorKey: 'code',
			header: 'Código',
		},
		{
			accessorKey: 'name',
			header: 'Nombre',
		},
		{
			accessorKey: 'unit',
			header: 'Unidad',
		},
		{
			accessorKey: 'category.name',
			header: 'Categoria',
		},
		{
			id: 'actions',
			cell: ({ row }) => {
				const material = row.original
				if (!material.id) return null

				return (
					<MaterialEditDrawer
						material={{
							code: material.code,
							name: material.name,
							unit: material.unit,
							id: material.id,
							category: material.category,
						}}
					/>
				)
			},
		},
	]

	return (
		<div>
			<PageTitle title='Materiales' />
			{isLoading && <Spinner />}

			<MaterialCreateDrawer />
			<DataTable columns={columns} data={data} />
		</div>
	)
}
