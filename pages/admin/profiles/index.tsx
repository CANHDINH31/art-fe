import ConfirmDeleteModal from "@/src/components/common/ConfirmDeleteModal";
import DataGridCustom from "@/src/components/common/DataGridCustom";
import AdminLayout from "@/src/components/layout/admin";
import AddNewProfile from "@/src/components/sections/admin/profiles/AddNewProfile";
import { getListProfile } from "@/src/lib/api";
import { deteleUser } from "@/src/lib/api/user";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { Box, Button } from "@mui/material";
import { GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { ReactElement, useState } from "react";
import { toast } from "react-toastify";

const Profiles = () => {
  const router = useRouter();
  const columns: GridColDef[] = [
    {
      field: "avatar",
      headerName: "",
      sortable: false,
      filterable: false,
      width: 60,
      renderCell(params) {
        return (
          <Box
            component={"img"}
            src={params.row.avatar || "/img/jpg/default-avatar.jpg"}
            sx={{
              width: 40,
              height: 40,
              objectFit: "cover",
              borderRadius: "50%",
            }}
          />
        );
      },
    },
    { field: "name", headerName: "Name", width: 150 },
    { field: "username", headerName: "Username", width: 150 },
    { field: "follower", headerName: "Follower", width: 150 },
    { field: "following", headerName: "Following", width: 150 },
    { field: "location", headerName: "Location", width: 120 },
    { field: "joinDate", headerName: "Join date", width: 200 },
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
              onClick={() => router.push(`/admin/profiles/${param.row._id}`)}
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

  const [isOpenDeleteUser, setIsOpenDeleteUser] = useState<boolean>(false);
  const [listIdSelected, setListIdSelected] = useState<GridRowSelectionModel>(
    []
  );
  const [isOpenAddModal, setIsOpenAddModal] = useState<boolean>(false);

  const { data, refetch } = useQuery(
    ["listUsers"],
    async () => {
      try {
        const res = await getListProfile();
        return res.data;
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

  return (
    <Box>
      {/* Feature */}
      <Box display={"flex"} gap={2} justifyContent={"flex-end"} mt={4}>
        <Button variant="outlined" onClick={() => setIsOpenAddModal(true)}>
          <Box display={"flex"} gap={2}>
            <PlusCircleIcon width={18} />
            <span> Thêm mới</span>
          </Box>
        </Button>
      </Box>
      {/* Table List Profile */}
      <Box mt={4}>
        {data && (
          <DataGridCustom
            disableRowSelectionOnClick
            rows={data}
            columns={columns}
            hideFooter={true}
            rowHeight={60}
          />
        )}
      </Box>

      {/* Add New Profile */}
      <AddNewProfile
        open={isOpenAddModal}
        handleClose={() => setIsOpenAddModal(false)}
        refetch={refetch}
      />

      {/* Modal Confirm Delete */}
      <ConfirmDeleteModal
        handleOk={deleteUser}
        handleClose={() => setIsOpenDeleteUser(false)}
        open={isOpenDeleteUser}
        content="Bạn có chắc chắn xóa profile này ? Nếu xóa bạn sẽ không khôi phục được !!!"
      />
    </Box>
  );
};

export default Profiles;

Profiles.getLayout = function getLayout(page: ReactElement) {
  return (
    <AdminLayout title="Quản trị viên" page="Quản lý profile">
      {page}
    </AdminLayout>
  );
};
