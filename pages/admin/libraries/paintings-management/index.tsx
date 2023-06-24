import ConfirmDeleteModal from "@/src/components/common/ConfirmDeleteModal";
import DataGridCustom from "@/src/components/common/DataGridCustom";
import AdminLayout from "@/src/components/layout/admin";
import Tab from "@/src/components/sections/admin/libraries/Tab";
import AddNewPainting from "@/src/components/sections/admin/libraries/painting-management/AddNewPainting";
import SettingPM from "@/src/components/sections/admin/libraries/painting-management/SettingPM";
import { getListPaint } from "@/src/lib/api";
import { queryClient } from "@/src/lib/react-query";
import { typePaint } from "@/src/lib/types/paint";
import { GlobeAltIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { Box, Link, Pagination } from "@mui/material";
import { GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { ChangeEvent, ReactElement, useState } from "react";
import { detelePaint } from "@/src/lib/api";

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
          sx={{ width: 120, height: 120, objectFit: "cover", borderRadius: 2 }}
        />
      );
    },
  },
  { field: "title", headerName: "Tên", width: 250 },
  { field: "view", headerName: "Số lượt xem", width: 250 },
  {
    field: "action",
    headerName: "Hành động",
    sortable: false,
    filterable: false,
    width: 100,
    renderCell(param) {
      return (
        <Box display={"flex"} gap={4}>
          <Link href={`/admin/libraries/paintings-management/${param.row.id}`}>
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

const PaintingsManagement = () => {
  const [listIdSelected, setListIdSelected] = useState<GridRowSelectionModel>(
    []
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const handlePageChange = (event: ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const [isOpenDeletePaint, setIsOpenDeletePaint] = useState<boolean>(false);
  const [isOpenAddModal, setIsOpenAddModal] = useState<boolean>(false);
  const [isOpenAddNewPaint, setIsOpenAddNewPaint] = useState<boolean>(false);
  const [totalPage, setTotalPage] = useState<number>();

  const { data: listPaint } = useQuery(
    ["listPaint", currentPage],
    async () => {
      try {
        const res = await getListPaint(currentPage);
        setTotalPage(Math.ceil(res.data.totalItems / res.data.itemsPerPage));
        return res.data.data?.map((paint: typePaint) => ({
          ...paint,
          id: paint._id,
        }));
      } catch (err) {
        throw err;
      }
    },
    { keepPreviousData: true }
  );

  const { mutate: deletePaint, isLoading } = useMutation({
    mutationFn: async () => {
      try {
        await detelePaint(listIdSelected as string[]);
      } catch (error) {
        console.log(error);
      }
    },
    onSuccess: res => {
      queryClient.invalidateQueries({ queryKey: ["listPaint"] });
      setIsOpenDeletePaint(false);
    },
  });

  const handleOpenAddModal = () => {
    setIsOpenAddModal(true);
  };

  return (
    <Box>
      <Box display={"flex"} justifyContent={"flex-end"}>
        <Tab />
      </Box>
      <SettingPM
        listIdSelected={listIdSelected}
        handleOpenDelete={() => setIsOpenDeletePaint(true)}
        handleOpenAdd={handleOpenAddModal}
        handleOpenAddPaint={() => setIsOpenAddNewPaint(true)}
      />
      <Box mt={4}>
        {listPaint?.length > 0 && (
          <DataGridCustom
            checkboxSelection
            disableRowSelectionOnClick
            rows={listPaint}
            columns={columns}
            hideFooter={true}
            rowHeight={150}
            onRowSelectionModelChange={idSelected => {
              setListIdSelected(idSelected);
            }}
            rowSelectionModel={listIdSelected}
          />
        )}
      </Box>
      <Box mt={8} display={"flex"} justifyContent={"center"}>
        <Pagination
          count={totalPage}
          color="primary"
          page={currentPage}
          onChange={handlePageChange}
        />
      </Box>
      <ConfirmDeleteModal
        handleOk={deletePaint}
        handleClose={() => setIsOpenDeletePaint(false)}
        open={isOpenDeletePaint}
        content="Bạn có chắc chắn xóa những bức tranh này ? Nếu xóa bạn sẽ không khôi phục được !!!"
      />
      {/* <AddModal
        title="Thêm tranh vào danh mục"
        open={isOpenAddModal}
        handleClose={hanldeCloseAddModal}
      >
        <Select size="medium" fullWidth value={10}>
          <MenuItem value={10}>Tranh phong cảnh</MenuItem>
          <MenuItem value={20}>Tranh văn phòng</MenuItem>
          <MenuItem value={30}>Tranh dát vàng</MenuItem>
        </Select>
      </AddModal> */}
      <AddNewPainting
        open={isOpenAddNewPaint}
        handleClose={() => setIsOpenAddNewPaint(false)}
      />
    </Box>
  );
};

export default PaintingsManagement;

PaintingsManagement.getLayout = function getLayout(page: ReactElement) {
  return (
    <AdminLayout title="Quản trị viên" page="Quản lý thư viện">
      {page}
    </AdminLayout>
  );
};
