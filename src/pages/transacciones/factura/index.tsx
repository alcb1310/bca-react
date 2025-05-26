import { CircularProgress } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import PageTitle from '~/components/titles/PageTitle/PageTitle'
import { useGetAllInvoicesQuery } from '~/queries/transacciones/facturas'
import { useAppSelector } from '~/redux/hooks'
import AllInvoicesTable from '~components/parameters/invoices/AllInvoicesTable'
import EditToolbar from '~components/table/headers/toolbar'

export default function Factura() {
  const token = useAppSelector((state) => state.login.token)
  const { data, isFetching } = useQuery({
    queryKey: ['invoices'],
    queryFn: () => useGetAllInvoicesQuery({ token }),
  })
  const navigate = useNavigate()

  return (
    <>
      <PageTitle title='Facturas' />

      <EditToolbar
        title='Crear Factura'
        onClick={() => navigate('/transacciones/facturas/crear')}
      />
      {isFetching && (
        <CircularProgress data-testid='page.transactions.invoice.loading' />
      )}

      <AllInvoicesTable data={data!} />
    </>
  )
}
