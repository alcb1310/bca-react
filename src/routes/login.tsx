import { useMutation } from '@tanstack/react-query'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { setCookie } from '@tanstack/react-start/server'
import { toast } from 'sonner'
import z from 'zod'
import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldSet,
} from '@/components/ui/field'
import { useAppForm } from '@/hooks/formHook'
import { LoginMutation } from '@/queries/auth'
import { authStore } from '@/store/auth'

export const Route = createFileRoute('/login')({
	component: RouteComponent,
})

const saveCookie = createServerFn({ method: 'POST' })
	.inputValidator((data: { token: string }) => data)
	.handler(async ({ data: { token } }) => {
		setCookie('BCA-TOKEN', token, { httpOnly: true })
	})

const loginSchema = z.object({
	email: z
		.string({ message: 'Ingrese un correo' })
		.min(1, { message: 'Ingrese un correo' }),
	password: z
		.string({ message: 'Ingrese una contraseña' })
		.min(3, { message: 'La contraseña debe tener al menos 3 caracteres' }),
})

type LoginType = z.infer<typeof loginSchema>

function RouteComponent() {
	const navigate = useNavigate()

	const loginMutation = useMutation({
		mutationFn: LoginMutation,
		onSuccess: async (data) => {
			authStore.setState((state) => ({
				...state,
				user: data.user,
				token: data.token,
			}))

			await saveCookie({ data: { token: data.token } })
			navigate({ to: '/' })
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
			email: '',
			password: '',
		} satisfies LoginType as LoginType,
		validators: {
			onSubmit: loginSchema,
		},
		onSubmit: (data) => {
			loginMutation.mutate(data.value)
		},
	})

	return (
		<div className='w-1/2 mx-auto my-[10%]'>
			<h2 className='scroll-m-20 border-b pb-2 text-3xl text-center font-semibold tracking-tight first:mt-0'>
				Login
			</h2>
			<form
				className='border border-gray-300 rounded-lg p-5'
				onSubmit={(e) => {
					e.preventDefault()
					e.stopPropagation()
					form.handleSubmit()
				}}
			>
				<FieldGroup>
					<FieldSet>
						<FieldDescription>Ingrese sus credenciales</FieldDescription>
					</FieldSet>
				</FieldGroup>
				<FieldGroup className='my-5'>
					<FieldSet>
						<form.AppField name='email'>
							{(field) => (
								<field.TextField label='Email' type='email' name='email' />
							)}
						</form.AppField>

						<form.AppField name='password'>
							{(field) => (
								<field.TextField
									label='Password'
									type='password'
									name='password'
								/>
							)}
						</form.AppField>
					</FieldSet>
				</FieldGroup>
				<Field orientation={'horizontal'}>
					<form.AppForm>
						<form.FormButton
							size='lg'
							type='submit'
							label='Ingresar'
							className='w-full'
						/>
					</form.AppForm>
				</Field>
			</form>
		</div>
	)
}
