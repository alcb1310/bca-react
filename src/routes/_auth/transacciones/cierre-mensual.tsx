import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { SaveIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { FieldGroup, FieldSet } from '@/components/ui/field'
import PageTitle from '@/components/web/pageTitle'
import { useAppForm } from '@/hooks/formHook'
import { GetAllProjects } from '@/queries/parametros/projects'

export const Route = createFileRoute('/_auth/transacciones/cierre-mensual')({
	component: RouteComponent,
	loader: ({ context: { queryClient } }) => {
		queryClient.prefetchQuery({
			queryKey: ['proyectos', 'active'],
			queryFn: () => GetAllProjects({ active: true }),
		})
	},
})

function RouteComponent() {
	const { data: projects } = useSuspenseQuery({
		queryKey: ['proyectos', 'active'],
		queryFn: () => GetAllProjects({ active: true }),
	})

	const form = useAppForm({
		defaultValues: {
			project_id: '',
			date: '',
		},
	})

	const proyValues =
		projects?.map((item) => ({
			label: item.name,
			value: item.id as string,
		})) || []
	proyValues.unshift({
		label: 'Seleccione un proyecto',
		value: '',
	})

	return (
		<div>
			<PageTitle title='Cierre del Mes' />

			<div className='w-1/2 mx-auto my-3 p-3 bg-sidebar-primary-foreground '>
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
							<div className='flex justify-start gap-24'>
								<form.AppField name='date'>
									{(field) => (
										<field.TextField name='date' label='Fecha' type='date' />
									)}
								</form.AppField>
								<p className='w-1/2' />
							</div>

							<Button type='submit'>
								<SaveIcon size={10} />
								Generar Cierre
							</Button>
						</FieldSet>
					</FieldGroup>
				</form>
			</div>
		</div>
	)
}
