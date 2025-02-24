import { useState } from 'react'
import { ClearOutlined, Done, EditOutlined } from '@mui/icons-material'
import {
    DataGrid,
    GridActionsCellItem,
    GridColDef,
    GridRowParams,
} from '@mui/x-data-grid'

import { BudgetItem, BudgetItemResponse } from '@/types/partidas'
import BudgetItemDrawer from '@components/drawers/Settings/BudgetItems/BudgetItemDrawer'

type AllBudgetItemsTableProps = {
    allBudgetItems: BudgetItem[]
}

export default function AllBudgetItemsTable({
    allBudgetItems,
}: AllBudgetItemsTableProps) {
    const [open, setOpen] = useState<boolean>(false)
    const [selectedBudgetItem, setSelectedBudgetItem] =
        useState<BudgetItem | null>(null)

    function EditBudgetItem(params: BudgetItemResponse) {
        const bi: BudgetItem = {
            id: params.id,
            code: params.code,
            name: params.name,
            accumulate: params.accumulate,
            parent_id: params.parent?.id,
        }
        setSelectedBudgetItem(bi)
        setOpen(true)
    }

    const cols: GridColDef[] = [
        { field: 'code', headerName: 'Código', width: 120 },
        { field: 'name', headerName: 'Nombre', width: 500 },
        {
            field: 'level',
            headerName: 'Nivel',
            width: 70,
            disableColumnMenu: true,
            align: 'center',
        },
        {
            field: 'accumulate',
            headerName: 'Acumula',
            width: 90,
            disableColumnMenu: true,
            align: 'center',
            renderCell: (params) => {
                return params.row.accumulate ? (
                    <Done sx={{ fontSize: '0.95rem' }} />
                ) : (
                    <ClearOutlined sx={{ fontSize: '0.95rem' }} />
                )
            },
        },
        {
            field: 'parent_code',
            headerName: 'Padre',
            width: 120,
            valueGetter: (_value, row) => {
                return row.parent?.code
            },
        },
        {
            field: 'parent_id',
            headerName: 'Padre',
            valueGetter: (_value, row) => {
                return row.parent?.id
            },
        },
        {
            field: 'actions',
            type: 'actions',
            width: 10,
            getActions: (params: GridRowParams) => [
                <GridActionsCellItem
                    icon=<EditOutlined color='warning' />
                    label='Edit'
                    onClick={() => {
                        EditBudgetItem(params.row)
                    }}
                    sx={{
                        visibility: params.row.id === '' ? 'hidden' : 'visible',
                    }}
                />,
            ],
        },
    ]
    return (
        <>
            <DataGrid
                rows={allBudgetItems}
                rowHeight={25}
                getRowId={(row) => row.id}
                columns={cols}
                disableColumnFilter
                disableColumnResize
                disableRowSelectionOnClick
                disableMultipleRowSelection
                sx={{ '&, [class^=MuiDataGrid]': { border: 'none' } }}
                pagination
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 25,
                        },
                    },
                    columns: {
                        columnVisibilityModel: {
                            parent_id: false,
                        },
                    },
                }}
            />

            {open && (
                <BudgetItemDrawer
                    open={open}
                    onClose={() => setOpen(false)}
                    defaultValues={selectedBudgetItem!}
                />
            )}
        </>
    )
}
