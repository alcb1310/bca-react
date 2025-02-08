import { useState } from 'react'
import { DataGrid, GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid'

import { BudgetEditType, BudgetResponseType } from '~types/budget'
import BudgetDrawer from '~/components/drawers/Transactions/BudgetDrawer/BudgetDrawer'

type AllBudgetsTableProps = {
    data: BudgetResponseType[]
}

export default function ActualTable({ data }: AllBudgetsTableProps) {
    const [selectedBudget, setSelectedBudget] = useState<BudgetEditType | null>(
        null
    )
    const [open, setOpen] = useState<boolean>(false)

    const cols: GridColDef<BudgetResponseType>[] = [
        {
            field: 'budget_item_code',
            headerName: 'Codigo',
            width: 100,
            hideable: false,
            renderCell: (params) => {
                return params.row.budget_item.code
            },
        },
        {
            field: 'budget_item_name',
            headerName: 'Partida',
            width: 380,
            hideable: false,
            renderCell: (params) => {
                return params.row.budget_item.name
            },
        },
        {
            field: 'initial_quantity',
            headerName: 'Cant. Inicial',
            width: 130,
            align: 'right',
            valueFormatter: (params: { Float64: number; Valid: boolean }) => {
                return params.Valid
                    ? params.Float64.toLocaleString('es-EC', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    })
                    : ''
            },
        },
        {
            field: 'initial_cost',
            headerName: 'Costo Inicial',
            width: 130,
            align: 'right',
            valueFormatter: (params: { Float64: number; Valid: boolean }) => {
                return params.Valid
                    ? params.Float64.toLocaleString('es-EC', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    })
                    : ''
            },
        },
        {
            field: 'initial_total',
            headerName: 'Total Inicial',
            width: 130,
            align: 'right',
            valueFormatter: (params: number) => {
                return params.toLocaleString('es-EC', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                })
            },
        },
        {
            field: 'spent_quantity',
            headerName: 'Cant. Gastada',
            width: 130,
            align: 'right',
            valueFormatter: (params: { Float64: number; Valid: boolean }) => {
                return params.Valid
                    ? params.Float64.toLocaleString('es-EC', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    })
                    : ''
            },
        },
        {
            field: 'spent_total',
            headerName: 'Total Gastado',
            width: 130,
            align: 'right',
            valueFormatter: (params: number) => {
                return params.toLocaleString('es-EC', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                })
            },
        },
        {
            field: 'remaining_quantity',
            headerName: 'Cant. Disponible',
            width: 130,
            align: 'right',
            valueFormatter: (params: { Float64: number; Valid: boolean }) => {
                return params.Valid
                    ? params.Float64.toLocaleString('es-EC', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    })
                    : ''
            },
        },
        {
            field: 'remaining_cost',
            headerName: 'Costo Disponible',
            width: 130,
            align: 'right',
            valueFormatter: (params: { Float64: number; Valid: boolean }) => {
                return params.Valid
                    ? params.Float64.toLocaleString('es-EC', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    })
                    : ''
            },
        },
        {
            field: 'remaining_total',
            headerName: 'Total Disponible',
            width: 130,
            align: 'right',
            valueFormatter: (params: number) => {
                return params.toLocaleString('es-EC', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                })
            },
        },
        {
            field: 'updated_budget',
            headerName: 'Presupuesto Actualizado',
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
    ]

    const groupingModel: GridColumnGroupingModel = [
        {
            groupId: 'global',
            headerName: '',
            children: [{ field: 'code' }, { field: 'budget_item_id' }],
        },
        {
            groupId: 'Iniciales',
            headerAlign: 'center',
            children: [
                { field: 'initial_quantity' },
                { field: 'initial_cost' },
                { field: 'initial_total' },
            ],
        },
        {
            groupId: 'Gastados',
            headerAlign: 'center',
            children: [{ field: 'spent_quantity' }, { field: 'spent_total' }],
        },
        {
            groupId: 'Por Gastar',
            headerAlign: 'center',
            children: [
                { field: 'remaining_quantity' },
                { field: 'remaining_cost' },
                { field: 'remaining_total' },
            ],
        },
        {
            groupId: 'Presupuesto Actualizado',
            headerName: '',
            children: [{ field: 'updated_budget' }],
        },
    ]

    return (
        <>
            <DataGrid
                columns={cols}
                rows={data}
                getRowId={(row) => {
                    return `${row.project.id} - ${row.budget_item.id}`
                }}
                rowHeight={25}
                disableColumnFilter
                disableColumnResize
                disableRowSelectionOnClick
                disableMultipleRowSelection
                columnGroupingModel={groupingModel}
                sx={{ '&, [class^=MuiDataGrid]': { border: 'none' } }}
                pagination
                initialState={{
                    pagination: {
                        paginationModel: { pageSize: 25 },
                    },
                    columns: {
                        columnVisibilityModel: {
                            initial_quantity: false,
                            initial_cost: false,
                            initial_total: false,
                        },
                    },
                }}
            />

            <BudgetDrawer
                open={open}
                onClose={() => {
                    setOpen(false)
                    setSelectedBudget(null)
                }}
                defaultValues={selectedBudget!}
            />
        </>
    )
}
