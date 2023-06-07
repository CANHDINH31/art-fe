import AdminLayout from "@/src/components/layout/admin";
import { Box, Paper, Stack, Typography } from "@mui/material";
import React, { ReactElement } from "react";

const Statistical = () => {
  return <Box>Thong ke</Box>;
};

export default Statistical;

Statistical.getLayout = function getLayout(page: ReactElement) {
  return (
    <AdminLayout title="Quản trị viên" page="Thống kê">
      {page}
    </AdminLayout>
  );
};
