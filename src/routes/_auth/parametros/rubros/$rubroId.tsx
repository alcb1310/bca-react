import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute, Link } from '@tanstack/react-router'
import { CircleXIcon, SaveIcon } from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button'
import { FieldGroup, FieldSet } from '@/components/ui/field'
import { Spinner } from '@/components/ui/spinner'
import PageTitle from '@/components/web/pageTitle'
import { useAppForm } from '@/hooks/formHook'
import { GetOneRubro } from '@/queries/parametros/rubros'
import { type RubrosType, rubrosSchema } from '@/types/rubros'

export const Route = createFileRoute('/_auth/parametros/rubros/$rubroId')({
	component: RouteComponent,
	loader: ({ context: { queryClient }, params }) => {
		queryClient.prefetchQuery({
			queryKey: ['rubros', params.rubroId],
			queryFn: () => GetOneRubro(params.rubroId),
		})
	},
})

function RouteComponent() {
	const { rubroId } = Route.useParams()
	const { data: rubro, isLoading } = useSuspenseQuery({
		queryKey: ['rubros', rubroId],
		queryFn: () => GetOneRubro(rubroId),
	})

	const form = useAppForm({
		defaultValues: rubro as RubrosType,
		validators: {
			onSubmit: rubrosSchema,
		},
		onSubmit: (data) => {
			console.log(data.value)
		},
	})

	return (
		<div>
			<PageTitle title='Editar Rubro' />

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
							<form.AppField name='code'>
								{(field) => (
									<field.TextField
										name='code'
										label='Codigo'
										placeholder='Codigo'
									/>
								)}
							</form.AppField>

							<form.AppField name='name'>
								{(field) => (
									<field.TextField
										name='name'
										label='Nombre'
										placeholder='Nombre'
									/>
								)}
							</form.AppField>

							<form.AppField name='unit'>
								{(field) => (
									<field.TextField
										name='unit'
										label='Unidad'
										placeholder='Unidad'
									/>
								)}
							</form.AppField>
						</FieldSet>
					</FieldGroup>

					<div className='flex justify-around items-center '>
						<Button type='submit'>
							<SaveIcon size={10} />
							Guardar
						</Button>

						<Link
							to='/parametros/rubros'
							className={buttonVariants({ variant: 'secondary' })}
						>
							<CircleXIcon size={10} />
							Cancelar
						</Link>
					</div>
				</form>
			</div>
			{isLoading && <Spinner />}
		</div>
	)
}
