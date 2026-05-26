import { ViewIcon } from 'lucide-react'
import {
	Drawer,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '../ui/drawer'
import { DialogClose } from '../ui/dialog'
import { Button } from '../ui/button'
import type { Spent, SpentDetailsType } from '@/types/reports'
import { useQuery } from '@tanstack/react-query'
import { GetSpentDetails } from '@/queries/reports'
import { Spinner } from '../ui/spinner'
import type { ColumnDef } from '@tanstack/react-table'
import { ReportDataTable } from '../ui/report-data-table'

type SpentDetailsDrawerProps = {
	report: Spent
	project_id: string
	date: string
}

export function SpentDetailsDrawer({
	report,
	project_id,
	date,
}: SpentDetailsDrawerProps) {
	const { data, isLoading } = useQuery({
		queryKey: ['spent-detail', project_id, report.budget_item.id, date],
		queryFn: () =>
			GetSpentDetails({
				data: {
					project_id,
					budget_item_id: report.budget_item.id as string,
					date,
				},
			}),
	})

	const columns: ColumnDef<SpentDetailsType>[] = [
		{
			accessorKey: 'invoice_date',
			header: 'Fecha',
			cell: ({ row }) => {
				const dt = new Date(row.original.invoice_date)
				return dt.toLocaleDateString('es-EC', {
					year: 'numeric',
					month: '2-digit',
					day: '2-digit',
				})
			},
		},
		{
			accessorKey: 'supplier_name',
			header: 'Proveedor',
		},
		{
			accessorKey: 'invoice_number',
			header: 'Factura',
		},
		{
			accessorKey: 'invoice_total',
			header: 'Total',
			cell: ({ row }) => {
				return (
					<span className='block w-full text-right'>
						{row.original.invoice_total.toLocaleString('es-EC', {
							minimumFractionDigits: 2,
							maximumFractionDigits: 2,
						})}
					</span>
				)
			},
		},
	]

	return (
		<Drawer direction='right'>
			<DrawerTrigger>
				<ViewIcon size={16} />
			</DrawerTrigger>
			<DrawerContent>
				<div>
					<DrawerHeader>
						<DrawerTitle>Reporte de Gastos</DrawerTitle>
					</DrawerHeader>
					<div className='no-scrollbar overflow-y-auto my-2 px-4'>
						{isLoading && <Spinner />}
						<ReportDataTable columns={columns} data={data ? data : []} />
					</div>
					<DrawerFooter>
						<DialogClose asChild>
							<Button>Close</Button>
						</DialogClose>
					</DrawerFooter>
				</div>
			</DrawerContent>
		</Drawer>
	)
}
