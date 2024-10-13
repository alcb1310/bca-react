import { useState } from "react";
import { DataGrid, GridActionsCellItem, GridColDef, GridRowParams } from "@mui/x-data-grid";
import { MaterialType } from "../../../types/materials";
import { EditOutlined } from "@mui/icons-material";
import MaterialsDrawer from "../../drawers/Settings/Materials/MaterialsDrawer";

type AllMaterialsTableProps = {
  data: MaterialType[];
};

export default function AllMaterialsTable({ data }: AllMaterialsTableProps) {
  const [open, setOpen] = useState<boolean>(false)
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialType | null>(null)

  function handleEditMaterial(material: MaterialType) {
    setSelectedMaterial(material)
    setOpen(true)
  }

  const cols: GridColDef<MaterialType>[] = [
    { field: "code", headerName: "Código", width: 100 },
    { field: "name", headerName: "Nombre", width: 400 },
    { field: "unit", headerName: "Unidad", width: 150 },
    {
      field: "category",
      headerName: "Categoría",
      width: 400,
      valueGetter: (_value, row) => {
        return row.category?.name
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
            handleEditMaterial(params.row)
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
            paginationModel: { pageSize: 25 },
          },
        }}
      />

      {
        open && <MaterialsDrawer open={open} onClose={() => setOpen(false)} defaultValues={selectedMaterial!} />
      }
    </>
  )
}
