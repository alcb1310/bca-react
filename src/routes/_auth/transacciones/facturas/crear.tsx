import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute, Link } from '@tanstack/react-router'
import { FieldGroup, FieldSet } from '@/components/ui/field'
import PageTitle from '@/components/web/pageTitle'
import { useAppForm } from '@/hooks/formHook'
import { GetAllProjects } from '@/queries/parametros/projects'
import { GetAllSuppliers } from '@/queries/parametros/supplier'
import { type InvoiceCreateType, invoiceCreateSchema } from '@/types/invoice'
import { Button, buttonVariants } from '@/components/ui/button'
import { SaveIcon, CircleXIcon } from 'lucide-react'

export const Route = createFileRoute('/_auth/transacciones/facturas/crear')({
	component: RouteComponent,
	loader: ({ context: { queryClient } }) => {
		queryClient.ensureQueryData({
			queryKey: ['proyectos', 'active'],
			queryFn: () => GetAllProjects({ active: true }),
		})

		queryClient.ensureQueryData({
			queryKey: ['proveedores'],
			queryFn: () => GetAllSuppliers({}),
		})
	},
})

function RouteComponent() {
	const { data: proyectos } = useSuspenseQuery({
		queryKey: ['proyectos', 'active'],
		queryFn: () => GetAllProjects({ active: true }),
	})
	const { data: proveedores } = useSuspenseQuery({
		queryKey: ['proveedores'],
		queryFn: () => GetAllSuppliers({}),
	})

	const form = useAppForm({
		defaultValues: {
			project_id: '',
			supplier_id: '',
			invoice_date: '',
			invoice_number: '',
			invoice_total: 0,
		} satisfies InvoiceCreateType as InvoiceCreateType,
		validators: {
			onSubmit: invoiceCreateSchema,
		},
		onSubmit: (data) => {
			console.log(data.value)
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
									/>
								)}
							</form.AppField>

							<form.AppField name='supplier_id'>
								{(field) => (
									<field.SelectField
										label='Proveedor'
										name='supplier_id'
										options={provValues}
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
							to='/parametros/rubros'
							className={buttonVariants({ variant: 'secondary' })}
						>
							<CircleXIcon size={10} />
							Cancelar
						</Link>
					</div>
				</form>
			</div>
		</div>
	)
}
