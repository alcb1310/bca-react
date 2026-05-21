import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { CircleXIcon, PlusIcon, SaveIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { useAppForm } from '@/hooks/formHook'
import { GetAllPartidas } from '@/queries/parametros/budgetItem'
import {
	type InvoiceDetailsCreateType,
	invoiceDetailsCreateSchema,
} from '@/types/invoiceDetails'
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
import { CreateInvoiceDetail } from '@/queries/transacciones/invoiceDetails'

type CreateInvoiceDetailDrawerProps = {
	invoice_id: string
}

export function CreateInvoiceDetailDrawer({
	invoice_id,
}: CreateInvoiceDetailDrawerProps) {
	const queryClient = useQueryClient()
	const [open, setOpen] = useState(false)
	const { data: partidas } = useQuery({
		queryKey: ['partidas', 'non-accum'],
		queryFn: () => GetAllPartidas({ accum: false }),
	})

	const createInvoiceDetailMutation = useMutation({
		mutationFn: CreateInvoiceDetail,
		onSuccess: async () => {
			toast.success('Partida creada exitosamente')
			queryClient.invalidateQueries({ queryKey: ['facturas'] })
			queryClient.invalidateQueries({ queryKey: ['facturas-detalle'] })
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
			budget_item_id: '',
			quantity: 0,
			cost: 0,
			total: 0,
		} as InvoiceDetailsCreateType,
		validators: {
			onSubmit: invoiceDetailsCreateSchema,
			onChange: (data) => {
				const c = Number.parseFloat(data.value.cost.toString())
				const q = Number.parseFloat(data.value.quantity.toString())

				if (Number.isNaN(c) || Number.isNaN(q)) {
					data.value.total = 0
					return
				}

				data.value.total = q * c
			},
		},
		onSubmit: (data) => {
			const newData = {
				invoice_id: invoice_id,
				budget_item_id: data.value.budget_item_id,
				quantity: Number.parseFloat(data.value.quantity.toString()),
				cost: Number.parseFloat(data.value.cost.toString()),
				total: Number.parseFloat(data.value.total.toString()),
			}
			createInvoiceDetailMutation.mutate({ id: invoice_id, data: newData })
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
			form.reset()
		}
	}, [form.reset, open])

	return (
		<Drawer direction='right' open={open} onOpenChange={setOpen}>
			<DrawerTrigger asChild>
				<Button variant={'detail'} className='my-3'>
					<PlusIcon size={10} />
					Agregar Detalle
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
						<DrawerTitle>Agregar Detalle</DrawerTitle>
						<DrawerDescription>
							Agrega un nuevo detalle a la factura seleccionda
						</DrawerDescription>
					</DrawerHeader>
					<FieldGroup className='my-2 px-4'>
						<FieldSet>
							<form.AppField name='budget_item_id'>
								{(field) => (
									<field.SelectField
										label='Partida'
										name='budget_item_id'
										options={budgetItemValues}
									/>
								)}
							</form.AppField>

							<form.AppField name='quantity'>
								{(field) => (
									<field.TextField
										name='quantity'
										label='Cantidad'
										placeholder='0.00'
									/>
								)}
							</form.AppField>

							<form.AppField name='cost'>
								{(field) => (
									<field.TextField
										name='cost'
										label='Costo'
										placeholder='0.00'
									/>
								)}
							</form.AppField>

							<form.AppField name='total'>
								{(field) => (
									<field.TextField
										name='total'
										label='Total'
										placeholder='0.00'
										type='number'
										step={0.01}
										disabled
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
