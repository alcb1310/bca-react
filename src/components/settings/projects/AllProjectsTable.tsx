import { useState } from 'react'
import { ClearOutlined, Done, EditOutlined } from '@mui/icons-material'
import {
    DataGrid,
    GridActionsCellItem,
    GridColDef,
    GridRowParams,
} from '@mui/x-data-grid'

import { ProjectType } from '~types/project'
import ProjectDrawer from '~components/drawers/Settings/Projects/ProjectDrawer'

type AllProjectsTableProps = {
    data: ProjectType[]
}

export default function AllProjectsTable({ data }: AllProjectsTableProps) {
    const [selectedProject, setSelectedProject] = useState<ProjectType | null>(
        null
    )
    const [open, setOpen] = useState<boolean>(false)

    const cols: GridColDef<ProjectType>[] = [
        { field: 'name', headerName: 'Nombre', width: 300 },
        {
            field: 'net_area',
            headerName: 'Area Bruta',
            width: 150,
            align: 'right',
            disableColumnMenu: true,
            valueFormatter: (params: number) => {
                return params.toLocaleString('es-EC', { minimumFractionDigits: 2 })
            },
        },
        {
            field: 'gross_area',
            headerName: 'Area Util',
            width: 150,
            align: 'right',
            disableColumnMenu: true,
            valueFormatter: (params: number) => {
                return params.toLocaleString('es-EC', { minimumFractionDigits: 2 })
            },
        },
        {
            field: 'is_active',
            headerName: 'Activo',
            width: 75,
            align: 'center',
            disableColumnMenu: true,
            renderCell: (params) => {
                return params.row.is_active ? (
                    <Done sx={{ fontSize: '0.95rem' }} />
                ) : (
                    <ClearOutlined sx={{ fontSize: '0.95rem' }} />
                )
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
                        EditProject(params.row)
                    }}
                />,
            ],
        },
    ]

    function EditProject(params: ProjectType) {
        setSelectedProject(params)
        setOpen(true)
    }

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
                <ProjectDrawer
                    open={open}
                    onClose={() => setOpen(false)}
                    defaultValues={selectedProject!}
                />
            )}
        </>
    )
}
