import { useState } from 'react'
import { EditOutlined } from '@mui/icons-material'
import {
    DataGrid,
    GridActionsCellItem,
    GridColDef,
    GridRowParams,
} from '@mui/x-data-grid'

import { CategoryType } from '@/types/categories'
import CategoriesDrawer from '@components/drawers/Settings/Categories/CategoriesDrawer'

type AllCategoriesTableProps = {
    data: CategoryType[]
}

export default function AllCategoriesTable({ data }: AllCategoriesTableProps) {
    const [open, setOpen] = useState<boolean>(false)
    const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(
        null
    )

    function handleEditCategory(category: CategoryType) {
        setSelectedCategory(category)
        setOpen(true)
    }

    const cols: GridColDef<CategoryType>[] = [
        {
            field: 'name',
            headerName: 'Categoría',
            width: 300,
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
                        handleEditCategory(params.row)
                    }}
                />,
            ],
        },
    ]

    return (
        <>
            <DataGrid
                rows={data}
                columns={cols}
                getRowId={(row) => row.id!}
                rowHeight={25}
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
                }}
            />

            {open && (
                <CategoriesDrawer
                    open={open}
                    onClose={() => setOpen(false)}
                    defaultValues={selectedCategory!}
                />
            )}
        </>
    )
}
