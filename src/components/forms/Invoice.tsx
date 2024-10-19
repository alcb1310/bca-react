import { MenuItem, Stack } from "@mui/material"
import { InvocieCreateType } from "../../types/invoice"
import { useForm } from "react-hook-form"
import { useGetAllProjectsQuery } from "../../redux/api/bca-backend/parametros/projectsSlice"
import BcaSelect from "../input/BcaSelect"
import ButtonGroup from "../buttons/button-group"
import { useGetAllSuppliersQuery } from "../../redux/api/bca-backend/parametros/supplierSlice"
import BcaTextField from "../input/BcaTextField"
import { DatePicker } from "@mui/x-date-pickers"

type InvoiceFormProps = {
  invoiceId: string
  invoice: InvocieCreateType
}

function InvoiceForm({
  invoiceId,
  invoice,
}: InvoiceFormProps) {
  const { control } = useForm<InvocieCreateType>({
    defaultValues: invoice
  })

  const { data: projects } = useGetAllProjectsQuery({ active: true })
  const { data: suppliers } = useGetAllSuppliersQuery({ search: '' })

  return (
    <>
      <form>
        <Stack direction={'column'} spacing={2}>
          <BcaSelect
            control={control}
            name={'project_id'}
            label={'Proyecto'}
            disabled={invoiceId?.toLowerCase() !== 'crear'}
          >
            {projects?.map(project => <MenuItem key={project.id} value={project.id}>{project.name}</MenuItem>)}
          </BcaSelect>

          <BcaSelect
            control={control}
            name='supplier_id'
            label='Proveedoredor'
            disabled={invoiceId?.toLowerCase() !== 'crear'}
          >
            {suppliers?.map(supplier => <MenuItem key={supplier.id} value={supplier.id}>{supplier.name}</MenuItem>)}
          </BcaSelect>

          <BcaTextField
            control={control}
            name='invoice_number'
            label='Número de Factura'
          />

          <Stack direction={'row'} justifyContent='space-between'>
            <DatePicker
              label='Fecha de Factura'
              slotProps={{
                textField: { size: 'small' }
              }}
            />
          </Stack>

          <ButtonGroup saveFunction={() => { }} cancelFunction={() => { }} />
        </Stack>
      </form>
    </>
  )
}

export default InvoiceForm
