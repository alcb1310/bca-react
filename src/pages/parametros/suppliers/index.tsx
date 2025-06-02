import { CircularProgress, Grid2, TextField } from '@mui/material'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useState } from 'react'
import PageTitle from '~/components/titles/PageTitle/PageTitle'
import { useGetAllSuppliersQuery } from '~/queries/parametros/proveedor'
import SupplierDrawer from '~components/drawers/Settings/Suppliers/SupplierDrawer'
import AllSuppliersTable from '~components/settings/suppliers/AllSuppliersTable'
import EditToolbar from '~components/table/headers/toolbar'

export default function Suppliers() {
  const [query, setQuery] = useState<string>('')
  const [open, setOpen] = useState<boolean>(false)

  const { data, isLoading } = useSuspenseQuery({
    queryKey: ['suppliers', query],
    queryFn: () => useGetAllSuppliersQuery({ search: query }),
  })

  return (
    <>
      <PageTitle title='Proveedores' />

      {isLoading && (
        <CircularProgress data-testid='page.parameters.suppliers.loading' />
      )}

      <Grid2 container spacing={2}>
        <Grid2 size={2}>
          <EditToolbar title='Crear Proveedor' onClick={() => setOpen(true)} />
        </Grid2>

        <Grid2 size={10}>
          <TextField
            label='Buscar'
            data-testid='page.parameters.suppliers.search'
            name='query'
            size='small'
            className='w-full'
            onChange={(e) => setQuery(e.target.value)}
          />
          '
        </Grid2>
      </Grid2>

      <AllSuppliersTable data={data!} />

      <SupplierDrawer
        open={open}
        onClose={() => setOpen(false)}
        defaultValues={{
          supplier_id: '',
          name: '',
        }}
      />
    </>
  )
}
