import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import type { ColumnDef } from '@tanstack/react-table'
import { DownloadIcon, PlayIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { FieldGroup, FieldSet } from '@/components/ui/field'
import { FormBackground } from '@/components/ui/form-background'
import { ReportDataTable } from '@/components/ui/report-data-table'
import { Spinner } from '@/components/ui/spinner'
import PageTitle from '@/components/web/pageTitle'
import { useAppForm } from '@/hooks/formHook'
import { GetAllProjects } from '@/queries/parametros/projects'
import {
	type BalanceReportType,
	balanceReportSchema,
} from '@/queries/reportes/excel'
import { GetBalanceReport, SetBalancedInvoice } from '@/queries/reports'
import type { InvoiceResponseType } from '@/types/invoice'
import { Checkbox } from '@/components/ui/checkbox'
import { toast } from 'sonner'

export const Route = createFileRoute('/_auth/reportes/cuadre')({
	component: RouteComponent,
	loader: async ({ context: { queryClient } }) => {
		queryClient.ensureQueryData({
			queryKey: ['proyectos', 'active'],
			queryFn: () => GetAllProjects({ data: { active: true } }),
		})
	},
})

function RouteComponent() {
	const queryClient = useQueryClient()
	const form = useAppForm({
		defaultValues: {
			project_id: '',
			date: '',
		} as BalanceReportType,
		validators: {
			onSubmit: balanceReportSchema,
		},
		onSubmit: () => {
			refetch()
		},
	})

	const setBalanceInvoice = useMutation({
		mutationFn: SetBalancedInvoice,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['cuadre'],
			})
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

	async function handleClick(data: InvoiceResponseType) {
		setBalanceInvoice.mutate({ data: { invoice_id: data.id } })
	}

	const { data, isLoading, isFetching, refetch } = useQuery({
		queryKey: ['cuadre', form.state.values],
		queryFn: () => GetBalanceReport({ data: form.state.values }),
		enabled:
			form.state.values.project_id !== '' && form.state.values.date !== '',
	})

	const columns: ColumnDef<InvoiceResponseType>[] = [
		{
			accessorKey: 'is_balanced',
			header: '',
			cell: ({ row }) => {
				return (
					<Checkbox
						checked={row.original.is_balanced}
						onCheckedChange={() => handleClick(row.original)}
					/>
				)
			},
		},
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

	const { data: proyects } = useQuery({
		queryKey: ['proyectos', 'active'],
		queryFn: () => GetAllProjects({ data: { active: true } }),
	})

	const proyValues =
		proyects?.map((item) => ({
			label: item.name,
			value: item.id as string,
		})) || []
	proyValues.unshift({
		label: 'Seleccione un proyecto',
		value: '',
	})

	return (
		<div>
			<PageTitle title='Cuadre' />
			<FormBackground>
				<form
					onSubmit={(e) => {
						e.preventDefault()
						e.stopPropagation()
						form.handleSubmit()
					}}
				>
					<FieldGroup>
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

							<div className='flex justify-between items-end'>
								<div className='w-6/12'>
									<form.AppField name='date'>
										{(field) => (
											<field.TextField label='Fecha' name='date' type='date' />
										)}
									</form.AppField>
								</div>
							</div>
						</FieldSet>
						<div className='my-4 flex justify-start gap-4'>
							<Button type='submit'>
								<PlayIcon size={16} />
								Generar
							</Button>

							<Button
								type='button'
								variant='detail'
								onClick={async (e) => {
									e.preventDefault()
									e.stopPropagation()

									if (!form.state.values.project_id || !form.state.values.date)
										return
								}}
							>
								<DownloadIcon size={16} />
								Exportar
							</Button>
						</div>
					</FieldGroup>
				</form>
			</FormBackground>
			{(isLoading || isFetching) && <Spinner />}
			{data && (
				<ReportDataTable
					data={data?.invoices ? data.invoices : []}
					columns={columns}
				/>
			)}
		</div>
	)
}
