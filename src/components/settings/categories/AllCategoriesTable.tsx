import { EditOutlined } from "@mui/icons-material";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowParams,
} from "@mui/x-data-grid";
import { CategoryType } from "../../../types/categories";

type AllCategoriesTableProps = {
  data: CategoryType[];
};

export default function AllCategoriesTable({ data }: AllCategoriesTableProps) {
  const cols: GridColDef[] = [
    {
      field: "name",
      headerName: "Categoría",
      width: 300,
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
            console.log(params.row);
          }}
        />,
      ],
    },
  ];

  return (
    <>
      <DataGrid
        rows={data}
        columns={cols}
        getRowId={(row) =>  row.id }
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
  );
}
