import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createFileRoute, Link } from '@tanstack/react-router'
import { SaveIcon } from 'lucide-react'
import { toast } from 'sonner'
import { Button, buttonVariants } from '@/components/ui/button'
import { FieldGroup, FieldSet } from '@/components/ui/field'
import PageTitle from '@/components/web/pageTitle'
import { useAppForm } from '@/hooks/formHook'
import { CreateRubro } from '@/queries/parametros/rubros'
import { type RubrosType, rubrosSchema } from '@/types/rubros'

export const Route = createFileRoute('/_auth/parametros/rubros/crear')({
	component: RouteComponent,
})

function RouteComponent() {
	const queryClient = useQueryClient()

	const createRubroMutation = useMutation({
		mutationFn: CreateRubro,
		onSuccess: () => {
			toast.success('Rubro creado exitosamente')
			queryClient.invalidateQueries({ queryKey: ['rubros'] })
			// TODO: redirect to the edit rubros page
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

	const form = useAppForm({
		defaultValues: {
			code: '',
			name: '',
			unit: '',
		} as RubrosType,
		validators: {
			onSubmit: rubrosSchema,
		},
		onSubmit: (data) => {
			createRubroMutation.mutate({ data: data.value })
		},
	})

	return (
		<div>
			<PageTitle title='Crear Rubro' />

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
							Cancelar
						</Link>
					</div>
				</form>
			</div>
		</div>
	)
}
