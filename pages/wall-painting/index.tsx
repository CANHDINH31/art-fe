import MainLayout from "@/src/components/layout/user";
import MainWP from "@/src/components/sections/wall-painting/MainWP";
import SettingWP from "@/src/components/sections/wall-painting/SettingWP";
import SidebarWP from "@/src/components/sections/wall-painting/SidebarWP";
import { Box, Container, Grid } from "@mui/material";
import React, { ReactElement } from "react";

const WallPaiting = () => {
  return (
    <Box py={4}>
      <Container>
        <SettingWP breadcrumb={["Giới thiệu danh mục"]} />
        <Box mt={12}>
          <Grid container spacing={12}>
            <Grid item md={3} display={{ xs: "none", md: "block" }}>
              <SidebarWP />
            </Grid>
            <Grid item xs={12} md={9}>
              <MainWP />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default WallPaiting;

WallPaiting.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout title="Tranh vẽ tường">{page}</MainLayout>;
};
