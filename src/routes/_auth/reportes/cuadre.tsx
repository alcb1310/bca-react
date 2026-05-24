import { Button } from '@/components/ui/button'
import { FieldGroup, FieldSet } from '@/components/ui/field'
import { FormBackground } from '@/components/ui/form-background'
import PageTitle from '@/components/web/pageTitle'
import { useAppForm } from '@/hooks/formHook'
import { GetAllProjects } from '@/queries/parametros/projects'
import {
	balanceReportSchema,
	type BalanceReportType,
} from '@/queries/reportes/excel'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { DownloadIcon, PlayIcon } from 'lucide-react'

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
	const form = useAppForm({
		defaultValues: {
			project_id: '',
			date: '',
		} as BalanceReportType,
		validators: {
			onSubmit: balanceReportSchema,
		},
		onSubmit: () => {
			// refetch()
		},
	})

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

									if (!form.state.values.project_id || !form.state.values.level)
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
		</div>
	)
}
