import AddModal from "@/src/components/common/AddModal";
import ConfirmDeleteModal from "@/src/components/common/ConfirmDeleteModal";
import DataGridCustom from "@/src/components/common/DataGridCustom";
import AdminLayout from "@/src/components/layout/admin";
import Tab from "@/src/components/sections/admin/libraries/Tab";
import SettingPM from "@/src/components/sections/admin/libraries/painting-management/SettingPM";
import { GlobeAltIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { Box, Link, MenuItem, Pagination, Select } from "@mui/material";
import {
  GridColDef,
  GridRowSelectionModel,
  GridRowsProp,
} from "@mui/x-data-grid";
import React, { ReactElement, useState } from "react";

const rows: GridRowsProp = [
  {
    id: 1,
    type: "Tranh Vẽ Tường ",
    image:
      "https://i.pinimg.com/736x/7c/b5/49/7cb5492889809cb8303b76b80759f0df.jpg",
    view: 50,
    count: 25,
  },
  {
    id: 2,
    type: "Tranh Vẽ Tường ",
    image:
      "https://i.pinimg.com/736x/7c/b5/49/7cb5492889809cb8303b76b80759f0df.jpg",
    view: 60,
    count: 35,
  },
  {
    id: 3,
    type: "Tranh Vẽ Tường ",
    image:
      "https://i.pinimg.com/736x/7c/b5/49/7cb5492889809cb8303b76b80759f0df.jpg",
    view: 20,
    count: 45,
  },
];

const columns: GridColDef[] = [
  {
    field: "image",
    headerName: "Ảnh đại diện",
    sortable: false,
    filterable: false,
    width: 250,
    renderCell(params) {
      return (
        <Box
          component={"img"}
          src={params.row.image}
          sx={{ width: 120, height: 120, objectFit: "cover", borderRadius: 2 }}
        />
      );
    },
  },
  { field: "type", headerName: "Loại", width: 250 },
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

const PaintingsManagement = () => {
  const [listIdSelected, setListIdSelected] = useState<GridRowSelectionModel>(
    []
  );

  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);
  const [isOpenAddModal, setIsOpenAddModal] = useState<boolean>(false);
  const hanldeCloseDeleteModal = () => {
    setIsOpenDeleteModal(false);
  };
  const handleOpenDeleteModal = () => {
    setIsOpenDeleteModal(true);
  };
  const hanldeCloseAddModal = () => {
    setIsOpenAddModal(false);
  };
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
        handleOpenDelete={handleOpenDeleteModal}
        handleOpenAdd={handleOpenAddModal}
      />
      <Box mt={4}>
        <DataGridCustom
          checkboxSelection
          disableRowSelectionOnClick
          rows={rows}
          columns={columns}
          hideFooter={true}
          rowHeight={150}
          onRowSelectionModelChange={idSelected => {
            setListIdSelected(idSelected);
          }}
          rowSelectionModel={listIdSelected}
        />
      </Box>
      <Box mt={8} display={"flex"} justifyContent={"center"}>
        <Pagination count={10} color="primary" />
      </Box>
      <ConfirmDeleteModal
        handleClose={hanldeCloseDeleteModal}
        open={isOpenDeleteModal}
        content="Bạn có chắc chắn xóa những bức tranh này ? Nếu xóa bạn sẽ không khôi phục được !!!"
      />
      <AddModal
        title="Thêm tranh vào danh mục"
        open={isOpenAddModal}
        handleClose={hanldeCloseAddModal}
      >
        <Select size="medium" fullWidth value={10}>
          <MenuItem value={10}>Tranh phong cảnh</MenuItem>
          <MenuItem value={20}>Tranh văn phòng</MenuItem>
          <MenuItem value={30}>Tranh dát vàng</MenuItem>
        </Select>
      </AddModal>
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
