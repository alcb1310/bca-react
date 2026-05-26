import { ChevronRightIcon } from 'lucide-react'
import type {
	AnalisisType,
	AnalisysDataType,
} from '@/queries/analisis/cantidades'
import { Button } from '../ui/button'
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '../ui/collapsible'
import { ColumnDef } from '@tanstack/react-table'
import { ReportDataTable } from '../ui/report-data-table'

type AnalisisCollapsibleProps = {
	data: AnalisisType
}

export function AnalisisCollapsible({ data }: AnalisisCollapsibleProps) {
	const columns: ColumnDef<AnalisysDataType>[] = [
		{
			accessorKey: 'material_name',
			header: 'Rubro',
		},
		{
			accessorKey: 'unit',
			header: 'Unidad',
		},
		{
			accessorKey: 'quantity',
			header: 'Cantidad',
		},
	]

	return (
		<Collapsible>
			<CollapsibleTrigger asChild>
				<Button variant='ghost' className='w-full justify-start'>
					{data.key}
					<ChevronRightIcon className='transition-transform group-data-[state=open]:rotate-90' />
				</Button>
			</CollapsibleTrigger>
			<CollapsibleContent>
				<ReportDataTable data={data.data} columns={columns} />
			</CollapsibleContent>
		</Collapsible>
	)
}
