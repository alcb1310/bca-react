import { useNavigate } from 'react-router-dom'
import {
    DataGrid,
    GridActionsCellItem,
    GridColDef,
    GridRowParams,
} from '@mui/x-data-grid'
import { EditOutlined } from '@mui/icons-material'

import { RubrosType } from '~types/rubros'

type AllRubrosTableProps = {
    data: RubrosType[]
}

export default function AllRubrosTable({ data }: AllRubrosTableProps) {
    const navigate = useNavigate()

    const cols: GridColDef<RubrosType>[] = [
        { field: 'code', headerName: 'Código', width: 200 },
        { field: 'name', headerName: 'Nombre', width: 400 },
        { field: 'unit', headerName: 'Unidad', width: 200 },
        {
            field: 'actions',
            type: 'actions',
            width: 10,
            getActions: (params: GridRowParams<RubrosType>) => [
                <GridActionsCellItem
                    icon=<EditOutlined color='warning' />
                    label='Edit'
                    onClick={() => navigate(`/parametros/rubros/${params.row.id}`)}
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
                        paginationModel: { pageSize: 25 },
                    },
                }}
            />
        </>
    )
}
