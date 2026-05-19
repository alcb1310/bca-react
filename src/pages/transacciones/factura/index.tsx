import { CircularProgress } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import AllInvoicesTable from '@/components/parameters/invoices/AllInvoicesTable'
import EditToolbar from '@/components/table/headers/toolbar'
import PageTitle from '@/components/titles/PageTitle'
import { GetAllInvoices } from '@/queries/transacciones/invoice'

export default function Factura() {
	const navigate = useNavigate()
	const { data, isLoading } = useQuery({
		queryKey: ['invoices'],
		queryFn: () => GetAllInvoices(),
	})

	return (
		<>
			<PageTitle title='Facturas' />

			<EditToolbar
				title='Crear Factura'
				onClick={() => navigate('/transacciones/facturas/crear')}
			/>
			{isLoading && (
				<CircularProgress data-testid='page.transactions.invoice.loading' />
			)}

			<AllInvoicesTable data={data!} />
		</>
	)
}
