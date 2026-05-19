import { useQuery } from '@tanstack/react-query'
import { CircleXIcon, PlusIcon, SaveIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useAppForm } from '@/hooks/formHook'
import { GetAllPartidas } from '@/queries/parametros/budgetItem'
import { type BudgetItem, budgetItemSchema } from '@/types/partidas'
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

export function PartidaCreateDrawer() {
	const [open, setOpen] = useState(false)
	const { data: partidas } = useQuery({
		queryKey: ['partidas', 'accum'],
		queryFn: () =>
			GetAllPartidas({
				accum: true,
			}),
	})

	const form = useAppForm({
		defaultValues: {
			name: '',
			code: '',
			accumulate: false,
			parent_id: '',
		} as BudgetItem,
		validators: {
			onSubmit: budgetItemSchema,
		},
		onSubmit: (data) => {
			console.log(data.value)
		},
	})

	const budgetItemValues =
		partidas?.map((item) => ({
			label: item.name,
			value: item.id as string,
		})) || []
	budgetItemValues.unshift({
		label: 'Seleccione una partida',
		value: '',
	})

	useEffect(() => {
		if (open) {
			setOpen(true)
		}
	}, [open, setOpen])

	return (
		<Drawer direction='right'>
			<DrawerTrigger>
				<Button>
					<PlusIcon size={16} />
					Crear Partida
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
						<DrawerTitle>Crear partida</DrawerTitle>
						<DrawerDescription>Crea una nueva partida</DrawerDescription>
					</DrawerHeader>
					<FieldGroup className='my-2 px-4'>
						<FieldSet>
							<form.AppField name='code'>
								{(field) => (
									<field.TextField
										name='code'
										label='Código'
										placeholder='codigo'
									/>
								)}
							</form.AppField>

							<form.AppField name='name'>
								{(field) => (
									<field.TextField
										name='name'
										label='Nombre'
										placeholder='Nombre de la Partida'
									/>
								)}
							</form.AppField>

							<form.AppField name='parent_id'>
								{(field) => (
									<field.SelectField
										label='Partida padre'
										name='parent_id'
										options={budgetItemValues}
									/>
								)}
							</form.AppField>

							<form.AppField name='accumulate'>
								{(field) => (
									<field.SwitchField name='accumulate' label='Acumula' />
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
