import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Stack, Typography } from '@mui/material'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { invoiceCreateSchema, InvoiceCreateType } from '@/types/invoice'
import { useGetAllProjectsQuery } from '@redux/api/bca-backend/parametros/projectsSlice'
import {
  useCreateInvoiceMutation,
  useUpdateInvoiceMutation,
} from '@redux/api/bca-backend/transacciones/invoiceSlice'
import { useGetAllSuppliersQuery } from '@redux/api/bca-backend/parametros/supplierSlice'
import BcaSelect from '@/components/input/BcaSelect/BcaSelect'
import ButtonGroup from '@components/buttons/button-group'
import BcaTextField from '@/components/input/BcaTextField/BcaTextField'
import BcaDateTextField from '@/components/input/BcaDateTextField/BcaDateTextField'

type InvoiceFormProps = {
  invoiceId: string
  invoice: InvoiceCreateType
}

function InvoiceForm({ invoiceId, invoice }: InvoiceFormProps) {
  const [conflictError, setConflictError] = useState<string>('')
  const navigate = useNavigate()
  const { control, handleSubmit } = useForm<InvoiceCreateType>({
    defaultValues: invoice,
    resolver: zodResolver(invoiceCreateSchema),
  })

  const { data: projects } = useGetAllProjectsQuery({ active: true })
  const { data: suppliers } = useGetAllSuppliersQuery({ search: '' })
  const [createInvoice] = useCreateInvoiceMutation()
  const [updateInvoice] = useUpdateInvoiceMutation()

  async function hadleSubmit(data: InvoiceCreateType) {
    setConflictError('')
    if (invoiceId?.toLowerCase() === 'crear') {
      const res = await createInvoice(data)
      if ('error' in res) {
        // @ts-expect-error error type is string
        setConflictError(res.error.data.error)
      }

      navigate(`/transacciones/facturas/${res.data?.id}`)
      return
    }

    const res = await updateInvoice(data)
    if ('error' in res) {
      // @ts-expect-error error type is string
      setConflictError(res.error.data.error)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(hadleSubmit)}>
        <Stack direction={'column'} spacing={2}>
          {conflictError && (
            <Typography color={'error'}>{conflictError}</Typography>
          )}
          {projects && (
            <BcaSelect
              control={control}
              datatestid='components.forms.invoice.project'
              name={'project_id'}
              label={'Proyecto'}
              disabled={invoiceId?.toLowerCase() !== 'crear'}
            >
              <option value=''>Seleccione un proyecto</option>
              {projects?.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </BcaSelect>
          )}

          {suppliers && (
            <BcaSelect
              control={control}
              datatestid='components.forms.invoice.supplier'
              name='supplier_id'
              label='Proveedoredor'
              disabled={invoiceId?.toLowerCase() !== 'crear'}
            >
              <option value=''>Seleccione un proveedor</option>
              {suppliers?.map((supplier) => (
                <option key={supplier.id} value={supplier.id}>
                  {supplier.name}
                </option>
              ))}
            </BcaSelect>
          )}

          <BcaTextField
            control={control}
            datatestid='components.forms.invoice.number'
            name='invoice_number'
            label='Número de Factura'
          />

          <Stack direction={'row'} justifyContent='space-between' spacing={2}>
            <BcaDateTextField
              datatestid='components.forms.invoice.date'
              control={control}
              name='invoice_date'
              label='Fecha de Factura'
            />

            <BcaTextField
              control={control}
              name='invoice_total'
              datatestid='components.forms.invoice.total'
              label='Total'
              disabled
              sx={{ textAlign: 'right' }}
            />
          </Stack>

          <ButtonGroup
            saveFunction={handleSubmit(hadleSubmit)}
            cancelFunction={() => navigate('/transacciones/facturas')}
          />
        </Stack>
      </form>
    </>
  )
}

export default InvoiceForm
