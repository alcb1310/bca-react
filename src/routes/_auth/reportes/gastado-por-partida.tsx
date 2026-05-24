import { useQuery, useSuspenseQueries } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import type { ColumnDef } from '@tanstack/react-table'
import { DownloadIcon, PlayIcon, ViewIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { FieldGroup, FieldSet } from '@/components/ui/field'
import { FormBackground } from '@/components/ui/form-background'
import { ReportDataTable } from '@/components/ui/report-data-table'
import { Spinner } from '@/components/ui/spinner'
import PageTitle from '@/components/web/pageTitle'
import { useAppForm } from '@/hooks/formHook'
import { GetAllProjects } from '@/queries/parametros/projects'
import { type ReportTypes, reportSchema } from '@/queries/reportes/excel'
import { GetAllLevels, GetSpentReport } from '@/queries/reports'
import type { Spent } from '@/types/reports'

export const Route = createFileRoute('/_auth/reportes/gastado-por-partida')({
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
			date: '',
		} as ReportTypes,
		validators: {
			onSubmit: reportSchema,
		},
		onSubmit: () => {
			refetch()
		},
	})

	const { data, isLoading, isFetching, refetch } = useQuery({
		queryKey: ['historico', form.state.values],
		queryFn: () => GetSpentReport({ data: form.state.values }),
		enabled:
			form.state.values.project_id !== '' &&
			form.state.values.level !== '' &&
			form.state.values.date !== '',
	})

	const columns: ColumnDef<Spent>[] = [
		{
			accessorKey: 'budget_item.code',
			header: 'Código',
		},
		{
			accessorKey: 'budget_item.name',
			header: 'Partida',
		},
		{
			accessorKey: 'spent',
			header: 'Total',
			cell: ({ row }) => {
				return (
					<span className='block w-full text-right'>
						{row.original.spent.toLocaleString('es-EC', {
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
				return <ViewIcon size={16} />
			},
		},
	]

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
			<PageTitle title='Gastado por partida' />

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

									if (!form.state.values.project_id || !form.state.values.level)
										return

									// try {
									// const b = await histroricExcelExport({
									// 	data: form.state.values,
									// })
									//
									// downloadExcelFile(await b.blob(), 'reporte.xlsx')
									// } catch (e) {
									// 	console.error(e)
									// }
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

			{data && data.spent.length > 0 && (
				<div className='w-2/3 mx-auto'>
					<ReportDataTable data={data.spent} columns={columns} />
				</div>
			)}
		</div>
	)
}
