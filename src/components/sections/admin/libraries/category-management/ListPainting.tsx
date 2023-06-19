import DataGridCustom from "@/src/components/common/DataGridCustom";
import { typePaint } from "@/src/lib/types/paint";
import {
  GlobeAltIcon,
  PencilSquareIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Box, Button, Link } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import React from "react";

type Props = { listPainting: typePaint[] };
const columns: GridColDef[] = [
  {
    field: "url",
    headerName: "Ảnh đại diện",
    sortable: false,
    filterable: false,
    width: 350,
    renderCell(params) {
      return (
        <Box
          component={"img"}
          src={params.row.url}
          sx={{ width: 120, height: 120, objectFit: "cover", borderRadius: 2 }}
        />
      );
    },
  },
  { field: "title", headerName: "Tên", width: 350 },
  {
    field: "action",
    headerName: "Hành động",
    sortable: false,
    filterable: false,
    width: 300,
    renderCell(param) {
      return (
        <Box display={"flex"} gap={4}>
          <Link href={`/admin/libraries/categories-management/${param.row.id}`}>
            <PencilSquareIcon width={30} color="#1976d2" />
          </Link>
          <Link href={`/wall-painting/${param.row.id}`}>
            <GlobeAltIcon width={30} color="#2e7d32" />
          </Link>
          <Link href={`/wall-painting/${param.row.id}`}>
            <XMarkIcon width={30} color="#d32f2f" />
          </Link>
        </Box>
      );
    },
  },
];
const ListPainting = ({ listPainting }: Props) => {
  return (
    <>
      <DataGridCustom
        rows={listPainting}
        columns={columns}
        hideFooter={true}
        rowHeight={150}
      />
      <Box mt={4} display={"flex"} justifyContent={"center"}>
        <Button variant="contained">Lưu</Button>
      </Box>
    </>
  );
};

export default ListPainting;
