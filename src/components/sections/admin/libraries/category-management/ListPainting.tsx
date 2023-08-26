import ConfirmDeleteModal from "@/src/components/common/ConfirmDeleteModal";
import DataGridCustom from "@/src/components/common/DataGridCustom";
import { removeFromCategory } from "@/src/lib/api";
import { queryClient } from "@/src/lib/react-query";
import { typePaint } from "@/src/lib/types/paint";
import { TrashIcon } from "@heroicons/react/24/outline";
import { Box, Button, Link } from "@mui/material";
import { GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Loading from "../../../common/Loading";
import { toast } from "react-toastify";

type Props = { listPainting: typePaint[] };

const ListPainting = ({ listPainting }: Props) => {
  const columns: GridColDef[] = [
    {
      field: "url",
      headerName: "Ảnh đại diện",
      sortable: false,
      filterable: false,
      width: 250,
      renderCell(params) {
        return (
          <Box
            component={"img"}
            src={params.row.url}
            sx={{
              width: 120,
              height: 120,
              objectFit: "cover",
              borderRadius: 2,
            }}
          />
        );
      },
    },
    { field: "title", headerName: "Tên", width: 250 },
    { field: "views", headerName: "Lượt xem", width: 150 },
    {
      field: "action",
      headerName: "Hành động",
      sortable: false,
      filterable: false,
      width: 300,
      renderCell(param) {
        return (
          <Box display={"flex"} alignItems={"center"} gap={2}>
            <Button
              variant="outlined"
              href={`/admin/libraries/categories-management/${param.row.id}`}
            >
              Chi tiết
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => {
                setIsOpenConfirmDelete(true);
                setListIdSelected([param.row.id]);
              }}
            >
              Xóa khỏi danh mục
            </Button>
          </Box>
        );
      },
    },
  ];

  const router = useRouter();
  const [listIdSelected, setListIdSelected] = useState<GridRowSelectionModel>(
    []
  );
  const [isOpenConfirmDelete, setIsOpenConfirmDelete] =
    useState<boolean>(false);

  const { mutate, isLoading } = useMutation({
    mutationFn: removeFromCategory,
    onSuccess: res => {
      toast.success("Xóa thành công");
      queryClient.invalidateQueries({ queryKey: ["detailCategory"] });
    },
    onError: error => {
      toast.error("Xóa thất bại");
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

  if (isLoading) return <Loading />;

  return (
    <>
      <Box mb={4} display={"flex"} justifyContent={"flex-end"}>
        <Button
          variant="outlined"
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
