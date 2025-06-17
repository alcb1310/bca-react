import ButtonGroup from '@/components/buttons/button-group'
import BcaDrawer from '@/components/drawers/BcaDrawer/BcaDrawer'
import BcaSelect from '@/components/input/BcaSelect'
import BcaTextField from '@/components/input/BcaTextField'
import DrawerTitle from '@/components/titles/DrawerTitle'
import { useGetAllBudgetItemsQuery } from '@/redux/api/bca-backend/parametros/budgetItemSlice'
import { useCreateIvoiceDetailsMutation } from '@/redux/api/bca-backend/transacciones/invoiceDetailsSlice'
import {
  type InvoiceDetailsCreateType,
  invoiceDetailsCreateSchema,
} from '@/types/invoiceDetails'
import { calculateTotal } from '@/utils/math'
import { zodResolver } from '@hookform/resolvers/zod'
import { Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { toast } from 'sonner'

type InvoiceDetailsDrawerProps = {
  open: boolean
  onClose: () => void
  invoiceId: string
}

export default function InvoiceDetailsDrawer({
  open,
  onClose,
  invoiceId,
}: InvoiceDetailsDrawerProps) {
  const [conflictError, setConflictError] = useState<string>('')
  const { data: budgetItems } = useGetAllBudgetItemsQuery({ accum: false })
  const { control, reset, handleSubmit } = useForm<InvoiceDetailsCreateType>({
    defaultValues: { budget_item_id: '', quantity: 0, cost: 0, total: 0 },
    resolver: zodResolver(invoiceDetailsCreateSchema),
  })

  useEffect(() => {
    reset({ budget_item_id: '', quantity: 0, cost: 0, total: 0 })
  }, [reset])

  const results = useWatch({ control })
  const total = calculateTotal(results.quantity, results.cost)

  const [createInvoiceDetail] = useCreateIvoiceDetailsMutation()

  async function hadleSubmit(data: InvoiceDetailsCreateType) {
    setConflictError('')
    const res = await createInvoiceDetail({
      body: data!,
      id: invoiceId,
    })

    if ('error' in res) {
      // @ts-expect-error data is part of the error object
      setConflictError(res.error.data.error)
      // @ts-expect-error data is part of the error object
      toast.error(`Error al crear el detalle: ${res.error.data.error}`)
      return
    }
    toast.success('Detalle creado exitosamente')
  }

  return (
    <BcaDrawer open={open} onClose={onClose}>
      <DrawerTitle title={'Crear Detalle'} close={onClose} />
      <form onSubmit={handleSubmit(hadleSubmit)}>
        <Stack direction='column' spacing={2} sx={{ mt: 2 }}>
          {conflictError && (
            <Typography color='error'>{conflictError}</Typography>
          )}
          <BcaSelect
            datatestid='component.drawer.transaction.invoid.details.budget-item'
            control={control}
            name='budget_item_id'
            label='Partida'
          >
            <option value=''>Seleccione una partida</option>
            {budgetItems?.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </BcaSelect>

          <BcaTextField
            control={control}
            name='quantity'
            datatestid='component.drawer.transaction.invoice.details.quantity'
            label='Cantidad'
          />

          <BcaTextField
            control={control}
            name='cost'
            label='Costo'
            datatestid='component.drawer.transaction.invoice.details.cost'
          />

          <BcaTextField
            datatestid='component.drawer.transaction.invoice.details.total'
            control={control}
            value={total}
            name='total'
            label='Total'
            disabled
          />

          <ButtonGroup
            saveFunction={handleSubmit(hadleSubmit)}
            cancelFunction={onClose}
          />
        </Stack>
      </form>
    </BcaDrawer>
  )
}
