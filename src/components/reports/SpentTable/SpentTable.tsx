import { Dispatch, SetStateAction } from 'react'
import { DataGrid, GridActionsCellItem, GridColDef } from '@mui/x-data-grid'
import { VisibilityOutlined } from '@mui/icons-material'

import { Spent, SpentResponseType } from '@/types/reports'

type SpentTableProps = {
    data: SpentResponseType
    setOpen: (open: boolean) => void
    setSelected: Dispatch<SetStateAction<Spent | undefined>>
}

export default function SpentTable({
    data,
    setOpen,
    setSelected,
}: SpentTableProps) {
    const cols: GridColDef<Spent>[] = [
        {
            field: 'code',
            headerName: 'Codigo',
            width: 100,
            hideable: false,
            renderCell(params) {
                return params.row.budget_item.code
            },
        },
        {
            field: 'name',
            headerName: 'Nombre',
            width: 380,
            hideable: false,
            renderCell(params) {
                return params.row.budget_item.name
            },
        },
        {
            field: 'spent',
            headerName: 'Total',
            width: 130,
            hideable: false,
            align: 'right',
            valueFormatter: (params: number) => {
                return params.toLocaleString('es-EC', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                })
            },
        },
        {
            field: 'actions',
            type: 'actions',
            width: 10,
            getActions: (params) => [
                <GridActionsCellItem
                    icon={<VisibilityOutlined />}
                    label='Borrar'
                    onClick={() => {
                        setOpen(true)
                        setSelected(params.row)
                    }}
                />,
            ],
        },
    ]

    return (
        <>
            <DataGrid
                columns={cols}
                rows={data?.spent}
                rowHeight={25}
                getRowId={(row) => {
                    return row.budget_item.id!
                }}
                pageSizeOptions={[]}
                disableColumnFilter
                disableColumnMenu
                disableColumnResize
                disableRowSelectionOnClick
                disableMultipleRowSelection
                hideFooter
                sx={{
                    '&, [class^=MuiDataGrid]': { border: 'none' },
                }}
            />
        </>
    )
}
