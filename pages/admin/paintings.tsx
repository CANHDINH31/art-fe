import AdminLayout from "@/src/components/layout/admin";
import { Box, Paper, Stack, Typography } from "@mui/material";
import React, { ReactElement } from "react";

const Paintings = () => {
  return <Box>Painting</Box>;
};

export default Paintings;

Paintings.getLayout = function getLayout(page: ReactElement) {
  return (
    <AdminLayout title="Quản trị viên" page="Quản lý thư viện">
      {page}
    </AdminLayout>
  );
};
