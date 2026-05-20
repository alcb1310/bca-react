import { CircleXIcon, PlusIcon, SaveIcon } from 'lucide-react'
import { useAppForm } from '@/hooks/formHook'
import {
	rubroMaterialSchema,
	type RubroMaterialType,
} from '@/types/rubro-material'
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
import { useQuery } from '@tanstack/react-query'
import { GetAllMaterials } from '@/queries/parametros/materials'

type ItemMaterialsCreateDrawerProps = {
	item: string
}

export function ItemMaterialsCreateDrawer({
	item,
}: ItemMaterialsCreateDrawerProps) {
	const { data: material } = useQuery({
		queryKey: ['materiales'],
		queryFn: () => GetAllMaterials(),
	})

	const form = useAppForm({
		defaultValues: {
			item_id: item,
			material_id: '',
			quantity: 0,
		} as RubroMaterialType,
		validators: {
			onSubmit: rubroMaterialSchema,
		},
	})

	const matValues =
		material?.map((item) => ({
			label: item.name,
			value: item.id as string,
		})) || []
	matValues.unshift({
		label: 'Seleccione un material',
		value: '',
	})

	return (
		<Drawer direction='right'>
			<DrawerTrigger asChild>
				<Button variant='default' className='my-3'>
					<PlusIcon size={16} />
					Agregar Material
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
						<DrawerTitle>Agregar Material</DrawerTitle>
						<DrawerDescription>
							Agrega un nuevo material que compone parte del rubro seleccionado
						</DrawerDescription>
					</DrawerHeader>
					<FieldGroup className='my-2 px-4'>
						<FieldSet>
							<form.AppField name='material_id'>
								{(field) => (
									<field.SelectField
										label='Material'
										name='material_id'
										options={matValues}
									/>
								)}
							</form.AppField>

							<form.AppField name='quantity'>
								{(field) => (
									<field.TextField
										name='quantity'
										label='Cantidad'
										placeholder='0.00'
										type='number'
										step={0.01}
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
