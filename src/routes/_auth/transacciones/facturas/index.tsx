import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute, Link } from '@tanstack/react-router'
import type { ColumnDef } from '@tanstack/react-table'
import { PlusIcon } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import { Spinner } from '@/components/ui/spinner'
import PageTitle from '@/components/web/pageTitle'
import { GetAllInvoices } from '@/queries/transacciones/invoice'
import type { InvoiceResponseType } from '@/types/invoice'

export const Route = createFileRoute('/_auth/transacciones/facturas/')({
	component: RouteComponent,
	loader: ({ context: { queryClient } }) => {
		queryClient.prefetchQuery({
			queryKey: ['facturas'],
			queryFn: () => GetAllInvoices(),
		})
	},
})

function RouteComponent() {
	const { data, isLoading } = useSuspenseQuery({
		queryKey: ['facturas'],
		queryFn: () => GetAllInvoices(),
	})

	const columns: ColumnDef<InvoiceResponseType>[] = [
		{
			accessorKey: 'invoice_date',
			header: 'Fecha',
			cell: ({ row }) => {
				const dt = new Date(row.original.invoice_date)
				return dt.toLocaleDateString('es-EC', {
					year: 'numeric',
					month: '2-digit',
					day: '2-digit',
				})
			},
		},
		{
			accessorKey: 'project.name',
			header: 'Proyecto',
		},
		{
			accessorKey: 'supplier.name',
			header: 'Proveedor',
		},
		{
			accessorKey: 'invoice_number',
			header: 'N° Factura',
		},
		{
			accessorKey: 'invoice_total',
			header: 'Total',
			cell: ({ row }) => {
				return (
					<span className='block w-full text-right'>
						{row.original.invoice_total.toLocaleString('es-EC', {
							minimumFractionDigits: 2,
							maximumFractionDigits: 2,
						})}
					</span>
				)
			},
		},
	]

	return (
		<div>
			<PageTitle title='Facturas' />
			<Link
				to='/transacciones/facturas/crear'
				className={`my-3 ${buttonVariants({ variant: 'default' })}`}
			>
				<PlusIcon size={16} />
				Crear Factura
			</Link>
			{isLoading && <Spinner />}

			<DataTable columns={columns} data={data} />
		</div>
	)
}
