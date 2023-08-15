import { DataGrid, GridActionsCellItem, type GridColDef } from "@mui/x-data-grid";
import { EditOutlined } from "@mui/icons-material";
import { Supplier } from "@/types/supplier";

type SupplierDataGridType = {
    suppliers: Supplier[]
}
export default function SupplierDataGrid({ suppliers }: SupplierDataGridType) {
    const columns: GridColDef[] = [
        {
            field: 'ruc',
            headerName: 'RUC',
            sortable: true,
            minWidth: 150,
        },
        {
            field: 'name',
            headerName: 'Nombre',
            sortable: true,
            flex: 1
        },
        {
            field: 'contactName',
            headerName: 'Nombre Contacto',
            flex: 1
        },
        {
            field: 'contactEmail',
            headerName: 'Email Contacto',
            flex: 1
        },
        {
            field: 'contactPhone',
            headerName: 'Teléfono Contacto',
            flex: 1
        },
        {
            field: 'actions',
            type: 'actions',
            getActions() {
                return [
                    <GridActionsCellItem
                        icon={<EditOutlined fontSize="small" />}
                        onClick={undefined}
                        label="Editar"
                        sx={{
                            fontSize: "0.9rem"
                        }}
                    />
                ]
            },
        }
    ]

    const rows = suppliers.map(supplier => ({
        ...supplier,
        id: supplier.uuid
    }))

    return <DataGrid columns={columns} rows={rows} />
}
