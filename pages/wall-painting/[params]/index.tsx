import MainLayout from "@/src/components/layout/user";
import Loading from "@/src/components/sections/common/Loading";
import MainWPC from "@/src/components/sections/wall-painting/MainWPC";
import SettingWPC from "@/src/components/sections/wall-painting/SettingWPC";
import SidebarWP from "@/src/components/sections/wall-painting/SidebarWP";
import { getDetailCategory } from "@/src/lib/api";
import { typeCategory } from "@/src/lib/types";
import { sortWallPainting } from "@/src/lib/utils/wall-painting";
import { Box, Container, Grid } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { ReactElement, useEffect, useState } from "react";
import { toast } from "react-toastify";

const WallPaintingCategory = () => {
  const router = useRouter();
  const [detailCategory, setDetailCategory] = useState<typeCategory | null>(
    null
  );
  const [filter, setFilter] = useState<string>("1");

  const { data } = useQuery(
    ["breadcrumbs", router.query.params],
    async () => {
      try {
        const res = await getDetailCategory(router.query.params as string);
        return res.data.data.title;
      } catch (err: any) {
        toast.error(err?.message || "Có lỗi xảy ra");
        throw err;
      }
    },
    {
      enabled: !!router.query.params,
      keepPreviousData: true,
    }
  );

  const { isLoading } = useQuery(
    ["detailCategory", router.query.params],
    async () => {
      try {
        const res = await getDetailCategory(router.query.params as string);
        setDetailCategory(res.data.data);
        return res.data.data;
      } catch (err: any) {
        toast.error(err?.message || "Có lỗi xảy ra");
        throw err;
      }
    },
    {
      enabled: !!router.query.params,
      keepPreviousData: true,
    }
  );

  useEffect(() => {
    if (detailCategory) {
      const data = sortWallPainting(detailCategory as typeCategory, filter);
      setDetailCategory(data);
    }
  }, [filter]);

  if (isLoading) return <Loading />;

  return (
    <Box py={4}>
      <Container>
        <SettingWPC
          breadcrumb={[data]}
          value={filter}
          onChange={(value: string) => setFilter(value)}
          detailCategory={detailCategory}
        />
        <Box mt={12}>
          <Grid container spacing={12}>
            <Grid item md={3} display={{ xs: "none", md: "block" }}>
              <SidebarWP />
            </Grid>
            <Grid item xs={12} md={9}>
              {detailCategory && <MainWPC detailCategory={detailCategory} />}
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
