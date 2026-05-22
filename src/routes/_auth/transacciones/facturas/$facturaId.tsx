import {
	useMutation,
	useQueryClient,
	useSuspenseQuery,
} from '@tanstack/react-query'
import { createFileRoute, Link } from '@tanstack/react-router'
import type { ColumnDef } from '@tanstack/react-table'
import { CircleXIcon, SaveIcon } from 'lucide-react'
import { toast } from 'sonner'
import { Button, buttonVariants } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import { FieldGroup, FieldSet } from '@/components/ui/field'
import { Spinner } from '@/components/ui/spinner'
import {
	CreateInvoiceDetailDrawer,
	DeleteInvoiceDetailsDialog,
} from '@/components/web/invoice-details-drawer'
import PageTitle from '@/components/web/pageTitle'
import { useAppForm } from '@/hooks/formHook'
import { GetAllProjects } from '@/queries/parametros/projects'
import { GetAllSuppliers } from '@/queries/parametros/supplier'
import { GetOneInvoice, UpdateInvoice } from '@/queries/transacciones/invoice'
import { GetAllInvoiceDetails } from '@/queries/transacciones/invoiceDetails'
import { invoiceCreateSchema } from '@/types/invoice'
import type { InvoiceDetailsResponseType } from '@/types/invoiceDetails'

export const Route = createFileRoute(
	'/_auth/transacciones/facturas/$facturaId',
)({
	component: RouteComponent,
	loader: async ({ context: { queryClient }, params }) => {
		await Promise.all([
			queryClient.prefetchQuery({
				queryKey: ['proyectos', 'active'],
				queryFn: () => GetAllProjects({ data: { active: true } }),
			}),
			queryClient.prefetchQuery({
				queryKey: ['proveedores'],
				queryFn: () => GetAllSuppliers({ data: {} }),
			}),
			queryClient.prefetchQuery({
				queryKey: ['facturas', params.facturaId],
				queryFn: () => GetOneInvoice({ data: { id: params.facturaId } }),
			}),
			queryClient.prefetchQuery({
				queryKey: ['facturas-detalle'],
				queryFn: () => GetAllInvoiceDetails(params.facturaId),
			}),
		])
	},
})

function RouteComponent() {
	const queryClient = useQueryClient()
	const { facturaId } = Route.useParams()

	const useUpdateInvoiceMutation = useMutation({
		mutationFn: UpdateInvoice,
		onSuccess: () => {
			toast.success('Factura actualizada exitosamente')
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

	const { data: proyectos } = useSuspenseQuery({
		queryKey: ['proyectos', 'active'],
		queryFn: () => GetAllProjects({ data: { active: true } }),
	})
	const { data: proveedores } = useSuspenseQuery({
		queryKey: ['proveedores'],
		queryFn: () => GetAllSuppliers({ data: {} }),
	})

	const { data: factura, isLoading: isLoadingFactura } = useSuspenseQuery({
		queryKey: ['facturas', facturaId],
		queryFn: () => GetOneInvoice({ data: { id: facturaId } }),
	})

	const { data, isLoading } = useSuspenseQuery({
		queryKey: ['facturas-detalle'],
		queryFn: () => GetAllInvoiceDetails(facturaId),
	})
	const columns: ColumnDef<InvoiceDetailsResponseType>[] = [
		{
			accessorKey: 'budget_item_code',
			header: 'Codigo',
		},
		{
			accessorKey: 'budget_item_name',
			header: 'Nombre',
		},
		{
			accessorKey: 'quantity',
			header: 'Cantidad',
			cell: ({ row }) => {
				return (
					<span className='block w-full text-right'>
						{row.original.quantity.toLocaleString('es-EC', {
							minimumFractionDigits: 2,
						})}
					</span>
				)
			},
		},
		{
			accessorKey: 'cost',
			header: 'Costo',
			cell: ({ row }) => {
				return (
					<span className='block w-full text-right'>
						{row.original.cost.toLocaleString('es-EC', {
							minimumFractionDigits: 2,
						})}
					</span>
				)
			},
		},
		{
			accessorKey: 'total',
			header: 'Total',
			cell: ({ row }) => {
				return (
					<span className='block w-full text-right'>
						{row.original.total.toLocaleString('es-EC', {
							minimumFractionDigits: 2,
						})}
					</span>
				)
			},
		},
		{
			id: 'actions',
			cell: ({ row }) => {
				return <DeleteInvoiceDetailsDialog invoice_detail={row.original} />
			},
		},
	]

	const form = useAppForm({
		defaultValues: factura,
		validators: {
			onSubmit: invoiceCreateSchema,
		},
		onSubmit: (data) => {
			useUpdateInvoiceMutation.mutate({ data: data.value })
		},
	})

	const proyValues =
		proyectos?.map((item) => ({
			label: item.name,
			value: item.id as string,
		})) || []
	proyValues.unshift({
		label: 'Seleccione un proyecto',
		value: '',
	})

	const provValues =
		proveedores?.map((item) => ({
			label: item.name,
			value: item.id as string,
		})) || []
	provValues.unshift({
		label: 'Seleccione un proveedor',
		value: '',
	})

	return (
		<div>
			<PageTitle title='Crear Factura' />

			<div className='w-1/2 mx-auto my-3 p-3 bg-sidebar-primary-foreground '>
				<form
					onSubmit={(e) => {
						e.preventDefault()
						e.stopPropagation()
						form.handleSubmit()
					}}
				>
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

							<form.AppField name='supplier_id'>
								{(field) => (
									<field.SelectField
										label='Proveedor'
										name='supplier_id'
										options={provValues}
										disabled
									/>
								)}
							</form.AppField>

							<form.AppField name='invoice_number'>
								{(field) => (
									<field.TextField
										name='invoice_number'
										label='N° Factura'
										placeholder='000-000-000000'
									/>
								)}
							</form.AppField>

							<div className='flex justify-around gap-24'>
								<form.AppField name='invoice_date'>
									{(field) => (
										<field.TextField
											name='invoice_date'
											label='Fecha'
											type='date'
											value={
												new Date(form.state.values.invoice_date)
													.toISOString()
													.split('T')[0]
											}
										/>
									)}
								</form.AppField>

								<form.AppField name='invoice_total'>
									{(field) => (
										<field.TextField
											className='text-right'
											name='invoice_total'
											label='Total'
											disabled
											type='number'
											step={0.01}
										/>
									)}
								</form.AppField>
							</div>
						</FieldSet>
					</FieldGroup>

					<div className='flex justify-around items-center '>
						<Button type='submit'>
							<SaveIcon size={10} />
							Guardar
						</Button>

						<Link
							to='/transacciones/facturas'
							className={buttonVariants({ variant: 'secondary' })}
						>
							<CircleXIcon size={10} />
							Cancelar
						</Link>
					</div>
				</form>
			</div>

			{(isLoading || isLoadingFactura) && <Spinner />}

			<CreateInvoiceDetailDrawer invoice_id={facturaId} />

			<DataTable columns={columns} data={data} />
		</div>
	)
}
