import { useQueries } from '@tanstack/react-query'
import { CircleXIcon, PlusIcon, SaveIcon } from 'lucide-react'
import { useAppForm } from '@/hooks/formHook'
import { GetAllProjects } from '@/queries/parametros/projects'
import { GetAllRubros } from '@/queries/parametros/rubros'
import {
	type QuantityCreateType,
	quantityCreateSchema,
} from '@/types/cantidades'
import { Button } from '../ui/button'
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '../ui/drawer'
import { FieldGroup, FieldSet } from '../ui/field'

export function CantidadesCreateDrawer() {
	const form = useAppForm({
		defaultValues: {
			project_id: '',
			rubro_id: '',
			quantity: 0,
		} as QuantityCreateType,
		validators: {
			onSubmit: quantityCreateSchema,
		},
		onSubmit: (data) => {
			console.log(data.value)
		},
	})

	const queries = useQueries({
		queries: [
			{
				queryKey: ['proyectos', 'active'],
				queryFn: () => GetAllProjects({ data: { active: true } }),
			},
			{
				queryKey: ['rubros'],
				queryFn: () => GetAllRubros(),
			},
		],
	})

	const proyValues =
		queries[0].data?.map((item) => ({
			label: item.name,
			value: item.id as string,
		})) || []
	proyValues.unshift({
		label: 'Seleccione un proyecto',
		value: '',
	})

	const itemValues =
		queries[1].data?.map((item) => ({
			label: item.name,
			value: item.id as string,
		})) || []
	itemValues.unshift({
		label: 'Seleccione un rubro',
		value: '',
	})

	return (
		<Drawer direction='right'>
			<DrawerTrigger asChild>
				<Button variant='default' className='flex my-3 justify-start gap-4'>
					<PlusIcon size={16} />
					Crear Cantidad
				</Button>
			</DrawerTrigger>
			<DrawerContent>
				<form
					onSubmit={(e) => {
						e.preventDefault()
						e.stopPropagation()
						form.handleSubmit()
					}}
				>
					<DrawerHeader>
						<DrawerTitle>Crear Cantidad</DrawerTitle>
						<DrawerDescription>
							Agrega una cantidad de un rubro para un proyecto especifico
						</DrawerDescription>
					</DrawerHeader>
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

							<form.AppField name='rubro_id'>
								{(field) => (
									<field.SelectField
										label='Rubro'
										name='rubro_id'
										options={itemValues}
									/>
								)}
							</form.AppField>

							<form.AppField name='quantity'>
								{(field) => (
									<field.TextField
										name='quantity'
										label='Cantidad'
										placeholder='cantidad'
									/>
								)}
							</form.AppField>
						</FieldSet>
					</FieldGroup>
					<DrawerFooter>
						<div className='flex justify-start items-center space-x-2'>
							<Button type='submit'>
								<SaveIcon size={10} />
								Guardar
							</Button>
							<DrawerClose asChild>
								<Button type='button' variant='secondary'>
									<CircleXIcon size={10} />
									Cancelar
								</Button>
							</DrawerClose>
						</div>
					</DrawerFooter>
				</form>
			</DrawerContent>
		</Drawer>
	)
}
