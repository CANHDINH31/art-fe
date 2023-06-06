import AdminLayout from "@/src/components/layout/admin";
import Tab from "@/src/components/sections/admin/libraries/Tab";
import { Box, Button, styled } from "@mui/material";
import React, { ReactElement } from "react";

const PaintingsManagement = () => {
  return (
    <Box display={"flex"} justifyContent={"flex-end"}>
      <Tab />
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
