import { Button } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import assigneeList from "~/static/assigneeList.json";
import departmentList from "~/static/department.json";
import statusList from "~/static/statusList.json";
import {TableData} from "~/routes/todo"


interface Props {
  data: any
  handleClickOpen: Function
  handleClickDeleteOpen: Function
}

// component for data grid table
export default function DataTable(props: Props) {
  // props
  const { data, handleClickOpen, handleClickDeleteOpen } = props;

  // columns for to-do page
  const columns: GridColDef[] = [
    { field: "title", headerName: "Title", flex: 2 },
    { field: "description", headerName: "Description", flex: 2 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      valueGetter: (params) => {
        return statusList.find((val) => val.value === params.value)?.label;
      },
    },
    { field: "priority", headerName: "Priority", flex: 1 },
    {
      field: "department",
      headerName: "Department",
      type: "number",
      flex: 1,
      valueGetter: (params) => {
        return departmentList.find((val) => val.value === params.value)?.label;
      },
    },
    {
      field: "assignee",
      headerName: "Assignee",
      flex: 1,
      valueGetter: (params) => {
        return assigneeList.find((val) => val.value === params.value)?.label;
      },
    },
    {
      field: "id",
      headerName: "Actions",
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => handleClickOpen(params.row)}>Edit</Button>
            <Button onClick={() => handleClickDeleteOpen(params.row)}>
              delete
            </Button>
          </>
        );
      },
      flex: 1,
    },
  ];

  // return component
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
    </div>
  );
}
