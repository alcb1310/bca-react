import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { MenuItem, Stack, Typography } from '@mui/material'

import DrawerTitle from '../../titles/DrawerTitle'
import BcaDrawer from '../BcaDrawer/BcaDrawer'
import ButtonGroup from '../../buttons/button-group'
import BcaSelect from '../../input/BcaSelect'
import { useGetAllBudgetItemsQuery } from '../../../redux/api/bca-backend/parametros/budgetItemSlice'
import {
  invoiceDetailsCreateSchema,
  InvoiceDetailsCreateType,
} from '../../../types/invoiceDetails'
import BcaTextField from '../../input/BcaTextField'
import { useCreateIvoiceDetailsMutation } from '../../../redux/api/bca-backend/transacciones/invoiceDetailsSlice'

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
  const { control, reset, setValue, getValues, handleSubmit } =
    useForm<InvoiceDetailsCreateType>({
      defaultValues: { budget_item_id: '', quantity: 0, cost: 0, total: 0 },
      resolver: zodResolver(invoiceDetailsCreateSchema),
    })

  useEffect(() => {
    reset({ budget_item_id: '', quantity: 0, cost: 0, total: 0 })
  }, [open])

  const [createInvoiceDetail] = useCreateIvoiceDetailsMutation()

  async function hadleSubmit(data: InvoiceDetailsCreateType) {
    setConflictError('')
    const res = await createInvoiceDetail({
      body: data!,
      id: invoiceId,
    })

    if ('error' in res) {
      console.log(res.error)
      // @ts-expect-error data is part of the error object
      setConflictError(res.error.data.error)
    }
  }

  return (
    <BcaDrawer open={open} onClose={onClose}>
      <DrawerTitle title='Detalle' close={onClose} />
      <form onSubmit={handleSubmit(hadleSubmit)}>
        <Stack direction='column' spacing={2} sx={{ mt: 2 }}>
          {conflictError && <Typography color='error'>{conflictError}</Typography>}
          <BcaSelect control={control} name='budget_item_id' label='Partida'>
            {budgetItems?.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.name}
              </MenuItem>
            ))}
          </BcaSelect>

          <BcaTextField
            control={control}
            name='quantity'
            label='Cantidad'
            onChange={(e) => {
              if (!isNaN(parseFloat(e.target.value))) {
                setValue('quantity', parseFloat(e.target.value))
                setValue(
                  'total',
                  getValues('cost') * parseFloat(e.target.value)
                )
              }
            }}
          />
          <BcaTextField
            control={control}
            name='cost'
            label='Costo'
            onChange={(e) => {
              if (!isNaN(parseFloat(e.target.value))) {
                setValue('cost', parseFloat(e.target.value))
                setValue(
                  'total',
                  getValues('quantity') * parseFloat(e.target.value)
                )
              }
            }}
          />
          <BcaTextField control={control} name='total' label='Total' disabled />

          <ButtonGroup
            saveFunction={handleSubmit(hadleSubmit)}
            cancelFunction={onClose}
          />
        </Stack>
      </form>
    </BcaDrawer>
  )
}
