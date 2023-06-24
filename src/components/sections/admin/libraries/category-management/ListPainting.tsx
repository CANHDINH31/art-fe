import ConfirmDeleteModal from "@/src/components/common/ConfirmDeleteModal";
import DataGridCustom from "@/src/components/common/DataGridCustom";
import { removeFromCategory } from "@/src/lib/api";
import { queryClient } from "@/src/lib/react-query";
import { typePaint } from "@/src/lib/types/paint";
import {
  GlobeAltIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { Box, Button, Link } from "@mui/material";
import { GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { useState } from "react";

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
        </Box>
      );
    },
  },
];
const ListPainting = ({ listPainting }: Props) => {
  const router = useRouter();
  const [listIdSelected, setListIdSelected] = useState<GridRowSelectionModel>(
    []
  );
  const [isOpenConfirmDelete, setIsOpenConfirmDelete] =
    useState<boolean>(false);

  const { mutate, isLoading } = useMutation({
    mutationFn: removeFromCategory,
    onSuccess: res => {
      queryClient.invalidateQueries({ queryKey: ["detailCategory"] });
    },
  });

  const handleRemoveFromCategory = async () => {
    try {
      await mutate({
        _id: router.query.id as string,
        list_paint_id: listIdSelected as string[],
      });
    } catch (error) {
      throw error;
    }
    setListIdSelected([]);
    setIsOpenConfirmDelete(false);
  };

  return (
    <>
      <Box mb={4} display={"flex"} justifyContent={"flex-end"}>
        <Button
          variant="contained"
          color="error"
          onClick={() => setIsOpenConfirmDelete(true)}
          disabled={listIdSelected?.length === 0}
        >
          <Box display={"flex"} alignItems={"center"} gap={1}>
            <TrashIcon height={20} />
            <span>Xóa các mục đã chọn</span>
          </Box>
        </Button>
      </Box>
      <DataGridCustom
        checkboxSelection
        disableRowSelectionOnClick
        rows={listPainting}
        columns={columns}
        hideFooter={true}
        rowHeight={150}
        onRowSelectionModelChange={idSelected => {
          setListIdSelected(idSelected);
        }}
        rowSelectionModel={listIdSelected}
      />
      <ConfirmDeleteModal
        handleOk={handleRemoveFromCategory}
        handleClose={() => setIsOpenConfirmDelete(false)}
        open={isOpenConfirmDelete}
        content="Bạn có chắc chắn xóa những bức tranh này đã chọn ra khỏi danh mục này"
      />
    </>
  );
};

export default ListPainting;
