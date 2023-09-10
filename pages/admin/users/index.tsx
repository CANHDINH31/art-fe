import ConfirmDeleteModal from "@/src/components/common/ConfirmDeleteModal";
import DataGridCustom from "@/src/components/common/DataGridCustom";
import AdminLayout from "@/src/components/layout/admin";
import AddNewUser from "@/src/components/sections/admin/users/AddNewUser";
import DetailUser from "@/src/components/sections/admin/users/DetailUser";
import { deteleUser, getListUsers } from "@/src/lib/api/user";
import { typeUser } from "@/src/lib/types";
import { convertUrlImage } from "@/src/lib/utils/common";
import {
  ArrowPathIcon,
  PlusCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  Pagination,
  Select,
  TextField,
} from "@mui/material";
import { GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { ChangeEvent, ReactElement, useState } from "react";
import { toast } from "react-toastify";

const Users = () => {
  const columns: GridColDef[] = [
    {
      field: "email",
      headerName: "Email ",
      sortable: false,
      filterable: false,
      width: 350,
      renderCell(params) {
        return (
          <Box display={"flex"} gap={4} alignItems={"center"}>
            <Box
              component={"img"}
              src={
                params.row.image
                  ? convertUrlImage(params.row.image)
                  : "/img/jpg/default-avatar.jpg"
              }
              sx={{
                width: 30,
                height: 30,
                objectFit: "cover",
                borderRadius: "50%",
              }}
            />
            <Box>{params.row.email}</Box>
          </Box>
        );
      },
    },
    { field: "name", headerName: "Họ tên", width: 200 },
    {
      field: "isAdmin",
      headerName: "Vai trò",
      width: 200,
      headerAlign: "center",
      align: "center",
      renderCell(param) {
        return (
          <Button color={param.row.isAdmin ? "error" : "primary"}>
            {param.row.isAdmin ? "Admin" : "User"}
          </Button>
        );
      },
    },
    {
      field: "provider",
      headerName: "Nền tảng",
      sortable: false,
      filterable: false,
      align: "center",
      width: 150,
      headerAlign: "center",
      renderCell(param) {
        return (
          <Box
            component={"img"}
            src={
              param.row.provider === "GOOGLE"
                ? "/img/svg/Google.svg"
                : param.row.provider === "WEB"
                ? "/img/svg/Internet.svg"
                : "/img/svg/Facebook.svg"
            }
            sx={{
              width: 20,
              height: 20,
              objectFit: "cover",
              borderRadius: "50%",
            }}
          />
        );
      },
    },
    {
      field: "action",
      headerName: "Hành động",
      sortable: false,
      filterable: false,
      headerAlign: "center",
      align: "center",
      width: 200,
      renderCell(param) {
        return (
          <Box display={"flex"} alignItems={"center"} gap={2}>
            <Button
              onClick={() => {
                setIsOpenEditModal(true);
                setIdUserEdit(param.row._id);
              }}
              variant="outlined"
              size="small"
            >
              Chi tiết
            </Button>
            <Button
              variant="outlined"
              color="error"
              size="small"
              onClick={() => {
                setIsOpenDeleteUser(true);
                setListIdSelected([param.row._id]);
              }}
            >
              Xóa
            </Button>
          </Box>
        );
      },
    },
  ];
  const [totalPage, setTotalPage] = useState<number>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchText, setSearchText] = useState<string>("");
  const [provider, setProvider] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [isOpenDeleteUser, setIsOpenDeleteUser] = useState<boolean>(false);
  const [listIdSelected, setListIdSelected] = useState<GridRowSelectionModel>(
    []
  );
  const [isOpenAddModal, setIsOpenAddModal] = useState<boolean>(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState<boolean>(false);
  const [idUserEdit, setIdUserEdit] = useState<string>("");

  const { data, refetch } = useQuery(
    ["listUsers", currentPage, searchText, provider, role],
    async () => {
      try {
        const res = await getListUsers({
          page: currentPage.toString(),
          searchText,
          provider,
          role,
        });
        setTotalPage(Math.ceil(res.data.totalItems / res.data.itemsPerPage));
        return res.data.data?.map((el: typeUser) => ({ ...el, id: el._id }));
      } catch (err: any) {
        throw err;
      }
    },
    { keepPreviousData: true }
  );

  const { mutate: deleteUser } = useMutation({
    mutationFn: async () => {
      try {
        await deteleUser(listIdSelected as string[]);
      } catch (error) {
        toast.error("Xóa thất bại");
      }
    },
    onSuccess: (res) => {
      toast.success("Xóa thành công");
      setIsOpenDeleteUser(false);
      refetch();
    },
  });

  const handlePageChange = (event: ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const handleClear = () => {
    setSearchText("");
    setProvider("");
    setRole("");
  };

  return (
    <Box>
      {/* Search */}
      <Grid container>
        <Grid xs={3} item>
          <TextField
            variant="standard"
            placeholder="Tìm kiếm theo họ tên hoặc email"
            fullWidth
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </Grid>
        <Grid xs={0.5} item></Grid>
        <Grid xs={3} item>
          <Select
            variant="standard"
            fullWidth
            value={provider}
            onChange={(e) => setProvider(e.target.value)}
            displayEmpty
          >
            <MenuItem value="">Tất cả </MenuItem>
            <MenuItem value={"Facebook"}>Facebook</MenuItem>
            <MenuItem value={"Google"}>Google</MenuItem>
            <MenuItem value={"Web"}>Web</MenuItem>
          </Select>
        </Grid>
        <Grid xs={0.5} item></Grid>
        <Grid xs={3} item>
          <Select
            variant="standard"
            fullWidth
            value={role}
            onChange={(e) => setRole(e.target.value)}
            displayEmpty
          >
            <MenuItem value={""}>Tất cả </MenuItem>
            <MenuItem value={"Admin"}>Admin</MenuItem>
            <MenuItem value={"User"}>User</MenuItem>
          </Select>
        </Grid>
        <Grid xs={0.5} item></Grid>
        <Grid xs={1.5} item>
          <Button
            variant="outlined"
            size="small"
            fullWidth
            color="error"
            onClick={handleClear}
          >
            <Box display={"flex"} gap={2}>
              <ArrowPathIcon width={16} />
              <span>Clear</span>
            </Box>
          </Button>
        </Grid>
      </Grid>
      {/* Feature */}
      <Box display={"flex"} gap={2} justifyContent={"flex-end"} mt={4}>
        <Button variant="outlined" onClick={() => setIsOpenAddModal(true)}>
          <Box display={"flex"} gap={2}>
            <PlusCircleIcon width={18} />
            <span> Thêm mới</span>
          </Box>
        </Button>
        <Button
          variant="outlined"
          color="error"
          onClick={() => setIsOpenDeleteUser(true)}
          disabled={listIdSelected?.length < 1}
        >
          <Box display={"flex"} gap={2}>
            <TrashIcon width={16} />
            <span>Xóa</span>
          </Box>
        </Button>
      </Box>
      {/* Table List User */}
      <Box mt={4}>
        {data && (
          <DataGridCustom
            checkboxSelection
            disableRowSelectionOnClick
            rows={data}
            columns={columns}
            hideFooter={true}
            rowHeight={60}
            onRowSelectionModelChange={(idSelected) => {
              setListIdSelected(idSelected);
            }}
            rowSelectionModel={listIdSelected}
          />
        )}
      </Box>
      {/* Pagination */}
      {Number(totalPage) > 1 && (
        <Box mt={8} display={"flex"} justifyContent={"center"}>
          <Pagination
            count={totalPage}
            color="primary"
            page={currentPage}
            onChange={handlePageChange}
          />
        </Box>
      )}

      {/* Add New User */}
      <AddNewUser
        open={isOpenAddModal}
        handleClose={() => setIsOpenAddModal(false)}
        refetch={refetch}
      />
      {/* Detail User */}
      <DetailUser
        open={isOpenEditModal}
        idEdit={idUserEdit}
        handleClose={() => setIsOpenEditModal(false)}
        refetch={refetch}
      />
      {/* Modal Confirm Delete */}
      <ConfirmDeleteModal
        handleOk={deleteUser}
        handleClose={() => setIsOpenDeleteUser(false)}
        open={isOpenDeleteUser}
        content="Bạn có chắc chắn xóa user này ? Nếu xóa bạn sẽ không khôi phục được !!!"
      />
    </Box>
  );
};

export default Users;

Users.getLayout = function getLayout(page: ReactElement) {
  return (
    <AdminLayout title="Quản trị viên" page="Quản lý người dùng">
      {page}
    </AdminLayout>
  );
};
