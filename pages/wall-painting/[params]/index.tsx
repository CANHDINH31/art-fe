import MainLayout from "@/src/components/layout/user";
import Loading from "@/src/components/sections/common/Loading";
import MainWPC from "@/src/components/sections/wall-painting/MainWPC";
import SettingWPC from "@/src/components/sections/wall-painting/SettingWPC";
import SidebarWP from "@/src/components/sections/wall-painting/SidebarWP";
import { getDetailCategory } from "@/src/lib/api";
import { Box, Container, Grid } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";

const WallPaintingCategory = () => {
  const router = useRouter();
  const { data, isLoading } = useQuery(
    ["breadcrumbs", router.query.params],
    async () => {
      try {
        const res = await getDetailCategory(router.query.params as string);
        return res.data.data.title;
      } catch (err) {
        throw err;
      }
    },
    {
      enabled: !!router.query.params,
      keepPreviousData: true,
    }
  );

  if (isLoading) return <Loading />;

  return (
    <Box py={4}>
      <Container>
        <SettingWPC breadcrumb={[data]} />
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
