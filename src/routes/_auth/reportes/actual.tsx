import { useQuery, useSuspenseQueries } from '@tanstack/react-query'
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
	actualExcelExport,
	type ReportTypes,
	reportSchema,
} from '@/queries/reportes/excel'
import { GetAllLevels } from '@/queries/reports'
import { GetAllBugetsByProjectAndLevel } from '@/queries/transacciones/budget'
import type { BudgetResponseType } from '@/types/budget'
import { downloadExcelFile } from '@/utils/download'

export const Route = createFileRoute('/_auth/reportes/actual')({
	component: RouteComponent,
	loader: async ({ context: { queryClient } }) => {
		queryClient.ensureQueryData({
			queryKey: ['proyectos', 'active'],
			queryFn: () => GetAllProjects({ data: { active: true } }),
		})
		queryClient.ensureQueryData({
			queryKey: ['niveles'],
			queryFn: () => GetAllLevels(),
		})
	},
})

function RouteComponent() {
	const form = useAppForm({
		defaultValues: {
			project_id: '',
			level: '',
		} as ReportTypes,
		validators: {
			onSubmit: reportSchema,
		},
		onSubmit: () => {
			refetch()
		},
	})

	const results = useSuspenseQueries({
		queries: [
			{
				queryKey: ['proyectos', 'active'],
				queryFn: () => GetAllProjects({ data: { active: true } }),
			},
			{
				queryKey: ['niveles'],
				queryFn: () => GetAllLevels(),
			},
		],
	})
	const { data, refetch, isLoading, isFetching } = useQuery({
		queryKey: ['actual', { ...form.state.values }],
		queryFn: () =>
			GetAllBugetsByProjectAndLevel({
				data: {
					project_id: form.state.values.project_id,
					level: form.state.values.level,
				},
			}),
		enabled:
			form.state.values.project_id !== '' && form.state.values.level !== '',
	})

	const columns: ColumnDef<BudgetResponseType>[] = [
		{
			accessorKey: 'budget_item.code',
			header: 'Código',
		},
		{
			accessorKey: 'budget_item.name',
			header: 'Partida',
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
			id: 'gastado',
			header: () => <span className='block text-center'>Gastado</span>,
			columns: [
				{
					accessorKey: 'spent_quantity',
					header: 'Cantidad',
					cell: ({ row }) => {
						const q = row.original.spent_quantity

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
					accessorKey: 'spent_total',
					header: 'Total',
					cell: ({ row }) => {
						const q = row.original.spent_total

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
			],
		},
		{
			id: 'por gastar',
			header: () => <span className='block text-center'>Por Gastar</span>,
			columns: [
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
			],
		},
	]

	const proyValues =
		results[0].data?.map((item) => ({
			label: item.name,
			value: item.id as string,
		})) || []
	proyValues.unshift({
		label: 'Seleccione un proyecto',
		value: '',
	})

	const levelValues = results[1].data?.map((item) => ({
		label: item.value,
		value: item.key,
	}))
	levelValues.unshift({
		label: 'Seleccione un nivel',
		value: '',
	})

	return (
		<div>
			<PageTitle title='Actual' />

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

							<div className='w-4/12'>
								<form.AppField name='level'>
									{(field) => (
										<field.SelectField
											label='Nivel'
											name='level'
											options={levelValues}
										/>
									)}
								</form.AppField>
							</div>
						</FieldSet>
					</FieldGroup>
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

								if (!form.state.values.project_id || !form.state.values.level)
									return

								try {
									const b = await actualExcelExport({ data: form.state.values })

									downloadExcelFile(await b.blob(), 'reporte.xlsx')
								} catch (e) {
									console.error(e)
								}
							}}
						>
							<DownloadIcon size={16} />
							Exportar
						</Button>
					</div>
				</form>
			</FormBackground>

			{(isLoading || isFetching) && <Spinner />}

			{data && <ReportDataTable data={data} columns={columns} />}
		</div>
	)
}
