import AdminLayout from "@/src/components/layout/admin";
import { Box, Grid } from "@mui/material";
import React, { ReactElement } from "react";
import BasicParameter from "@/src/components/sections/admin/statistical/BasicParameter";
import AccessParamter from "@/src/components/sections/admin/statistical/AccessParameter";
import OrderParameter from "@/src/components/sections/admin/statistical/OrderParameter";

const Statistical = () => {
  return (
    <Box>
      <BasicParameter />
      <Grid container mt={8}>
        <Grid item xs={6}>
          <AccessParamter />
        </Grid>
        <Grid item xs={6}>
          <OrderParameter />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Statistical;

Statistical.getLayout = function getLayout(page: ReactElement) {
  return (
    <AdminLayout title="Quản trị viên" page="Thống kê">
      {page}
    </AdminLayout>
  );
};
