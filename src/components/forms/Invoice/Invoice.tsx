import { zodResolver } from '@hookform/resolvers/zod'
import { Stack, Typography } from '@mui/material'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import BcaDateTextField from '~/components/input/BcaDateTextField/BcaDateTextField'
import BcaSelect from '~/components/input/BcaSelect/BcaSelect'
import BcaTextField from '~/components/input/BcaTextField/BcaTextField'
import { useGetAllSuppliersQuery } from '~/queries/parametros/proveedor'
import { useGetAllProjectsQuery } from '~/queries/parametros/proyectos'
import {
  useCreateInvoiceMutation,
  useUpdateInvoiceMutation,
} from '~/queries/transacciones/facturas'
import ButtonGroup from '~components/buttons/button-group'
import { type InvoiceCreateType, invoiceCreateSchema } from '~types/invoice'

type InvoiceFormProps = {
  invoiceId: string
  invoice: InvoiceCreateType
}

function InvoiceForm({ invoiceId, invoice }: InvoiceFormProps) {
  const queryClient = useQueryClient()
  const [conflictError, setConflictError] = useState<string>('')
  const navigate = useNavigate()
  const { control, handleSubmit } = useForm<InvoiceCreateType>({
    defaultValues: {
      ...invoice,
      invoice_date: invoiceId === 'crear' ? new Date() : invoice.invoice_date,
    },
    resolver: zodResolver(invoiceCreateSchema),
  })

  const { data: projects } = useQuery({
    queryKey: ['projects', 'active'],
    queryFn: () => useGetAllProjectsQuery({ active: true }),
  })
  const { data: suppliers } = useQuery({
    queryKey: ['suppliers'],
    queryFn: () => useGetAllSuppliersQuery({}),
  })
  const { mutate: createInvoice } = useMutation({
    mutationFn: useCreateInvoiceMutation,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['invoice', data.id] })
      toast.success('Factura creada')
      navigate({ to: '/transacciones/facturas/$id', params: { id: data.id! } })
    },
    onError: (error) => {
      setConflictError(error.message)
      toast.error(`Error al crear la factura: ${error.message}`)
    },
  })
  const { mutate: updateInvoice } = useMutation({
    mutationFn: useUpdateInvoiceMutation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoice', invoiceId] })
    },
    onError: (error) => {
      setConflictError(error.message)
    },
  })

  async function hadleSubmit(data: InvoiceCreateType) {
    setConflictError('')
    if (invoiceId?.toLowerCase() === 'crear') {
      createInvoice({ invoice: data })
      return
    }

    updateInvoice({ invoice: data })
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
            cancelFunction={() => navigate({ to: '/transacciones/facturas' })}
          />
        </Stack>
      </form>
    </>
  )
}

export default InvoiceForm
