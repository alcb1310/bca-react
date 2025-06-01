import { zodResolver } from '@hookform/resolvers/zod'
import { Stack, Typography } from '@mui/material'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { toast } from 'sonner'
import BcaSelect from '~/components/input/BcaSelect/BcaSelect'
import BcaTextField from '~/components/input/BcaTextField/BcaTextField'
import DrawerTitle from '~/components/titles/DrawerTitle/DrawerTitle'
import { useGetAllBudgetItemsQuery } from '~/queries/parametros/partidas'
import { useCreateIvoiceDetailsMutation } from '~/queries/transacciones/detalle'
import ButtonGroup from '~components/buttons/button-group'
import BcaDrawer from '~components/drawers/BcaDrawer/BcaDrawer'
import {
  type InvoiceDetailsCreateType,
  invoiceDetailsCreateSchema,
} from '~types/invoiceDetails'

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
  const queryClient = useQueryClient()
  const [conflictError, setConflictError] = useState<string>('')
  const { control, reset, handleSubmit } = useForm<InvoiceDetailsCreateType>({
    defaultValues: { budget_item_id: '', quantity: 0, cost: 0, total: 0 },
    resolver: zodResolver(invoiceDetailsCreateSchema),
  })

  const { data: budgetItems } = useQuery({
    queryKey: ['budget-items'],
    queryFn: () => useGetAllBudgetItemsQuery({}),
  })

  useEffect(() => {
    reset({ budget_item_id: '', quantity: 0, cost: 0, total: 0 })
  }, [open])

  function calculateTotal(): number {
    const q = results.quantity
      ? Number.isNaN(results.quantity)
        ? 0
        : results.quantity
      : 0

    const c = results.cost ? (Number.isNaN(results.cost) ? 0 : results.cost) : 0

    const r = q * c
    if (Number.isNaN(r)) return 0
    return r
  }

  const results = useWatch({ control })
  const total = calculateTotal()

  const { mutate: createDetail } = useMutation({
    mutationFn: useCreateIvoiceDetailsMutation,
    onSuccess: () => {
      toast.success('Detalle creado')
    },
    onError: (error) => {
      setConflictError(error.message)
      toast.error(`Error al crear el detalle: ${error.message}`)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['invoice', invoiceId] })
      queryClient.invalidateQueries({ queryKey: ['details'] })
    },
  })

  async function hadleSubmit(data: InvoiceDetailsCreateType) {
    setConflictError('')
    createDetail({ id: invoiceId, detail: data })
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
