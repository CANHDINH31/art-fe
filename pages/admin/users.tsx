import AdminLayout from "@/src/components/layout/admin";
import { Box, Paper, Stack, Typography } from "@mui/material";
import React, { ReactElement } from "react";

const Users = () => {
  return <Box>THONG KE</Box>;
};

export default Users;

Users.getLayout = function getLayout(page: ReactElement) {
  return (
    <AdminLayout title="Quản trị viên" page="Quản lý người dùng">
      {page}
    </AdminLayout>
  );
};
