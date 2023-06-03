import MainLayout from "@/src/components/layout";
import MainWPC from "@/src/components/sections/wall-painting/MainWPC";
import SettingWPC from "@/src/components/sections/wall-painting/SettingWPC";
import SidebarWP from "@/src/components/sections/wall-painting/SidebarWP";
import { Box, Container, Grid } from "@mui/material";
import React, { ReactElement } from "react";

const WallPaintingCategory = () => {
  return (
    <Box py={4}>
      <Container>
        <SettingWPC />
        <Box mt={12}>
          <Grid container spacing={12}>
            <Grid item md={3} display={{ xs: "none", md: "block" }}>
              <SidebarWP />
            </Grid>
            <Grid item xs={12} md={9}>
              <MainWPC />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default WallPaintingCategory;

WallPaintingCategory.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout title="Tranh vẽ tường">{page}</MainLayout>;
};
