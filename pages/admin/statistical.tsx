import AdminLayout from "@/src/components/layout/admin";
import { Box, Grid, Paper, Stack, Typography } from "@mui/material";
import React, { ReactElement } from "react";
import BasicParameter from "@/src/components/sections/admin/statistical/BasicParameter";
import AccessParamter from "@/src/components/sections/admin/statistical/AccessParameter";
import OrderParameter from "@/src/components/sections/admin/statistical/OrderParameter";

const Statistical = () => {
  return (
    <Box>
      <BasicParameter />
      <Grid container mt={8} spacing={4}>
        <Grid item xs={6}>
          <AccessParamter />
        </Grid>
        <Grid item xs={6}>
          <OrderParameter />
        </Grid>
      </Grid>
      <Grid container mt={8} spacing={4}>
        <Grid xs={6} item>
          <Paper elevation={3}>
            <Box p={2}>
              <Typography variant={"h4"} fontWeight={600}>
                Top tranh
              </Typography>
              <Grid container spacing={4} mt={4}>
                <Grid item xs={7}>
                  <Box
                    component={"img"}
                    src={"/img/jpg/reset-password.jpg"}
                    width={"100%"}
                    height={258}
                    sx={{ objectFit: "cover" }}
                  />
                </Grid>
                <Grid item xs={5}>
                  <Stack gap={3} height={"100%"}>
                    <Typography variant="h5">
                      Tên tranh: Đình làng quê hương
                    </Typography>
                    <Typography variant="h5">
                      Danh mục: Tranh đồng quê
                    </Typography>
                    <Typography variant="h5">Số lượt đánh giá: 1110</Typography>
                    <Typography variant="h5">Số lượt bình luận: 925</Typography>
                    <Typography variant="h5">Số lượt xem: 1256</Typography>
                    <Typography variant="h5">Số lượt yêu thích: 256</Typography>
                    <Typography variant="h5">Số lượt mua: 10</Typography>
                  </Stack>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>
        <Grid xs={6} item>
          <Paper elevation={3}>
            <Box p={2}>
              <Typography variant={"h4"} fontWeight={600}>
                Top người dùng
              </Typography>
              <Grid container spacing={4} mt={4}>
                <Grid item xs={7}>
                  <Box
                    component={"img"}
                    src={"https://avatarfiles.alphacoders.com/305/305541.jpg"}
                    width={"100%"}
                    height={258}
                    sx={{ objectFit: "cover" }}
                  />
                </Grid>
                <Grid item xs={5}>
                  <Stack gap={3} height={"100%"}>
                    <Typography variant="h5">
                      Họ tên: Nguyễn Văn Trường
                    </Typography>
                    <Typography variant="h5">
                      Số điện thoại: 0349011666
                    </Typography>
                    <Typography variant="h5">Số lượt đánh giá: 1110</Typography>
                    <Typography variant="h5">Số lượt bình luận: 925</Typography>
                    <Typography variant="h5">Số lượt xem: 1256</Typography>
                    <Typography variant="h5">Số lượt yêu thích: 256</Typography>
                    <Typography variant="h5">Số lượt mua: 10</Typography>
                  </Stack>
                </Grid>
              </Grid>
            </Box>
          </Paper>
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
