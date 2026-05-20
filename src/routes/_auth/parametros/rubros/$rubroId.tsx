import { useMutation, useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute, Link } from '@tanstack/react-router'
import type { ColumnDef } from '@tanstack/react-table'
import { CircleXIcon, PlusIcon, SaveIcon } from 'lucide-react'
import { toast } from 'sonner'
import { Button, buttonVariants } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import { FieldGroup, FieldSet } from '@/components/ui/field'
import { Spinner } from '@/components/ui/spinner'
import PageTitle from '@/components/web/pageTitle'
import { useAppForm } from '@/hooks/formHook'
import { GetAllRubrosMaterials } from '@/queries/parametros/rubroMaterial'
import { GetOneRubro, UpdateRubro } from '@/queries/parametros/rubros'
import type { RubroMaterialResponseTye } from '@/types/rubro-material'
import { type RubrosType, rubrosSchema } from '@/types/rubros'

export const Route = createFileRoute('/_auth/parametros/rubros/$rubroId')({
	component: RouteComponent,
	loader: ({ context: { queryClient }, params }) => {
		queryClient.prefetchQuery({
			queryKey: ['rubros', params.rubroId],
			queryFn: () => GetOneRubro(params.rubroId),
		})

		queryClient.prefetchQuery({
			queryKey: ['rubros-material'],
			queryFn: () => GetAllRubrosMaterials(params.rubroId),
		})
	},
})

function RouteComponent() {
	const { rubroId } = Route.useParams()

	const { data, isLoading } = useSuspenseQuery({
		queryKey: ['rubros-material'],
		queryFn: () => GetAllRubrosMaterials(rubroId),
	})

	const { data: rubro, isLoading: rubroLoading } = useSuspenseQuery({
		queryKey: ['rubros', rubroId],
		queryFn: () => GetOneRubro(rubroId),
	})

	const columns: ColumnDef<RubroMaterialResponseTye>[] = [
		{
			accessorKey: 'material.code',
			header: 'Codigo',
		},
		{
			accessorKey: 'material.name',
			header: 'Codigo',
		},
		{
			accessorKey: 'material.unit',
			header: 'Unidad',
		},
		{
			accessorKey: 'quantity',
			header: 'Cantidad',
			cell: ({ row }) => {
				return (
					<span className='block w-full text-right'>
						{row.original.quantity.toLocaleString('es-EC', {
							minimumFractionDigits: 2,
							maximumFractionDigits: 2,
						})}
					</span>
				)
			},
		},
	]

	const useUpdateRubroMutation = useMutation({
		mutationFn: UpdateRubro,
		onSuccess: () => {
			toast.success('Rubro actualizado exitosamente')
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
		defaultValues: rubro as RubrosType,
		validators: {
			onSubmit: rubrosSchema,
		},
		onSubmit: (data) => {
			useUpdateRubroMutation.mutate({ data: data.value })
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
							className={buttonVariants({ variant: 'outline' })}
						>
							<CircleXIcon size={10} />
							Cancelar
						</Link>
					</div>
				</form>
			</div>
			{(isLoading || rubroLoading) && <Spinner />}

			<Button className='my-2'>
				<PlusIcon size={10} />
				Agregar Material
			</Button>

			<DataTable data={data} columns={columns} />
		</div>
	)
}
