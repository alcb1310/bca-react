import { ClearOutlined, Done, EditOutlined } from "@mui/icons-material";
import { DataGrid, GridActionsCellItem, GridColDef, GridRowParams } from "@mui/x-data-grid";
import { ProjectType } from "../../../types/project";

type AllProjectsTableProps = {
  data: ProjectType[];
};

export default function AllProjectsTable({ data }: AllProjectsTableProps) {
  const cols: GridColDef<ProjectType>[] = [
    { field: "name", headerName: "Nombre", width: 300 },
    {
      field: "net_area",
      headerName: "Área Bruta",
      width: 150,
      align: "right",
      disableColumnMenu: true,
      valueFormatter: (params: number) => {
        return params.toLocaleString("es-EC", { minimumFractionDigits: 2 })
      },
    },
    {
      field: "gross_area",
      headerName: "Área Util",
      width: 150,
      align: "right",
      disableColumnMenu: true,
      valueFormatter: (params: number) => {
        return params.toLocaleString("es-EC", { minimumFractionDigits: 2 })
      },
    },
    {
      field: "is_active",
      headerName: "Activo",
      width: 75,
      align: "center",
      disableColumnMenu: true,
      renderCell: (params) => {
        return params.row.is_active ? <Done sx={{ fontSize: "0.95rem" }} /> : <ClearOutlined sx={{ fontSize: "0.95rem" }} />
      }
    },
    {
      field: "actions",
      type: "actions",
      width: 10,
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem
          icon=<EditOutlined color="warning" />
          label="Edit"
          onClick={() => {
            console.log(params.row)
          }}
        />
      ]
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
        sx={{ "&, [class^=MuiDataGrid]": { border: "none" } }}
        pagination
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 25,
            },
          },
        }}
      />
    </>
  )
}
