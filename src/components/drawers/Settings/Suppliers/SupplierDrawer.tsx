import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { supplierSchema, SupplierType } from '../../../../types/supplier'
import DrawerTitle from '../../../titles/DrawerTitle'
import BcaDrawer from '../../BcaDrawer/BcaDrawer'
import BcaTextField from '../../../input/BcaTextField'
import ButtonGroup from '../../../buttons/button-group'
import {
  useCreateSupplierMutation,
} from '../../../../redux/api/bca-backend/parametros/supplierSlice'
import { Typography } from '@mui/material'

type SupplierDrawerProps = {
  open: boolean
  onClose: () => void
  defaultValues: SupplierType
}

export default function SupplierDrawer({
  open,
  onClose,
  defaultValues,
}: SupplierDrawerProps) {
  const [conflictError, setConflictError] = useState<string>('')
  const { control, reset, handleSubmit } = useForm<SupplierType>({
    defaultValues,
    resolver: zodResolver(supplierSchema),
  })

  const [createSupplier] = useCreateSupplierMutation()

  useEffect(() => {
    reset(defaultValues)
  }, [open])

  async function hadleSubmit(data: SupplierType) {
    if (!defaultValues.id) {
      const res = await createSupplier(data)
      if ('data' in res) {
        onClose()
        reset
      }

      // @ts-expect-error data is a property of the error message
      setConflictError(res.error.data.error)
      return
    }
  }

  return (
    <BcaDrawer open={open} onClose={onClose}>
      <DrawerTitle title='Proveedor' close={onClose} />

      <form
        className='mt-5 flex flex-col gap-5'
        onSubmit={handleSubmit(hadleSubmit)}
      >
        {conflictError && (
          <Typography color='error'>{conflictError}</Typography>
        )}
        <BcaTextField name='supplier_id' control={control} label='Ruc' />
        <BcaTextField name='name' control={control} label='Nombre' />
        <BcaTextField
          name='contact_name'
          control={control}
          label='Nombre Contacto'
        />
        <BcaTextField
          name='contact_email'
          control={control}
          label='Email Contacto'
        />
        <BcaTextField
          name='contact_phone'
          control={control}
          label='Telefono Contacto'
        />

        <ButtonGroup
          saveFunction={handleSubmit(hadleSubmit)}
          cancelFunction={onClose}
        />
      </form>
    </BcaDrawer>
  )
}
