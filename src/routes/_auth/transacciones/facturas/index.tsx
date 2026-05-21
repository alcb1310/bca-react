import {
	useMutation,
	useQueryClient,
	useSuspenseQuery,
} from '@tanstack/react-query'
import { createFileRoute, Link } from '@tanstack/react-router'
import type { ColumnDef } from '@tanstack/react-table'
import { DeleteIcon, EditIcon, PlusIcon } from 'lucide-react'
import { toast } from 'sonner'
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
} from '@/components/ui/alert-dialog'
import { buttonVariants } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import { Spinner } from '@/components/ui/spinner'
import PageTitle from '@/components/web/pageTitle'
import { DeleteInvoice, GetAllInvoices } from '@/queries/transacciones/invoice'
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
	const queryClient = useQueryClient()
	const { data, isLoading } = useSuspenseQuery({
		queryKey: ['facturas'],
		queryFn: () => GetAllInvoices(),
	})

	const useDeleteInvoiceMutation = useMutation({
		mutationFn: DeleteInvoice,
		onSuccess: () => {
			toast.success('Factura eliminada exitosamente')
			queryClient.invalidateQueries({ queryKey: ['facturas'] })
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
		{
			id: 'actions',
			cell: ({ row }) => {
				const factura = row.original

				return (
					<div className='flex px-3 justify-end items-center gap-2'>
						<Link
							to='/transacciones/facturas/$facturaId'
							params={{ facturaId: factura.id as string }}
						>
							<EditIcon size={15} className='text-yellow-600' />
						</Link>

						{factura.invoice_total === 0 && (
							<AlertDialog>
								<AlertDialogTrigger>
									<DeleteIcon size={16} className='text-red-600' />
								</AlertDialogTrigger>
								<AlertDialogContent>
									<AlertDialogHeader>
										<AlertDialogMedia className='bg-white'>
											<DeleteIcon size={16} className='bg-white text-red-600' />
										</AlertDialogMedia>
										<AlertDialogTitle className='text-red-600'>
											Eliminar Factura
										</AlertDialogTitle>
										<AlertDialogDescription>
											Esta seguro que desea eliminar la factura:
											<ul>
												<li>
													<span className='font-bold'>Fecha:</span>{' '}
													{new Date(factura.invoice_date).toLocaleDateString(
														'es-EC',
														{
															year: 'numeric',
															month: '2-digit',
															day: '2-digit',
														},
													)}
												</li>
												<li>
													<span className='font-bold'>Fecha:</span>{' '}
													{factura.project.name}
												</li>
												<li>
													<span className='font-bold'>N° Factura:</span>{' '}
													{factura.invoice_number}
												</li>
											</ul>
											Esta accion no se puede deshacer
										</AlertDialogDescription>
									</AlertDialogHeader>
									<AlertDialogFooter>
										<AlertDialogCancel>Cancelar</AlertDialogCancel>
										<AlertDialogAction
											onClick={() => {
												useDeleteInvoiceMutation.mutate({
													id: factura.id as string,
												})
											}}
										>
											Eliminar
										</AlertDialogAction>
									</AlertDialogFooter>
								</AlertDialogContent>
							</AlertDialog>
						)}
					</div>
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
