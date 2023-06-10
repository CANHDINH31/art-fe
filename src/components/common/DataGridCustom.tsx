import { SxProps } from "@mui/material";
import {
  DataGrid,
  DataGridProps,
  GridColDef,
  GridRowsProp,
} from "@mui/x-data-grid";
import React from "react";

type Props = {
  rows: GridRowsProp;
  columns: GridColDef[];
  sx?: SxProps;
} & Omit<DataGridProps, "rows" | "columns" | "sx">;

const DataGridCustom = ({ rows, columns, sx, ...otherProps }: Props) => {
  return (
    <DataGrid
      rows={rows}
      columns={columns}
      {...otherProps}
      sx={{
        cursor: "pointer",
        "& .MuiDataGrid-cellContent": {
          whiteSpace: "normal",
          maxHeight: 120,
          maxWidth: 350,
          overflow: "hidden",
        },
        ".MuiDataGrid-columnHeader:focus,.MuiDataGrid-cell:focus,.MuiDataGrid-columnHeader:focus-within,.MuiDataGrid-cell:focus-within":
          {
            outline: "none",
          },
        ...sx,
      }}
    />
  );
};

export default DataGridCustom;
