import AdminLayout from "@/src/components/layout/admin";
import Tab from "@/src/components/sections/admin/libraries/Tab";
import { Box } from "@mui/material";
import React, { ReactElement } from "react";

const CategoriesManagement = () => {
  return (
    <Box display={"flex"} justifyContent={"flex-end"}>
      <Tab />
    </Box>
  );
};

export default CategoriesManagement;

CategoriesManagement.getLayout = function getLayout(page: ReactElement) {
  return (
    <AdminLayout title="Quản trị viên" page="Quản lý thư viện">
      {page}
    </AdminLayout>
  );
};
