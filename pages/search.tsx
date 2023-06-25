import MainLayout from "@/src/components/layout/user";
import CardItem from "@/src/components/sections/common/CardItem";
import Loading from "@/src/components/sections/common/Loading";
import SettingWP from "@/src/components/sections/wall-painting/SettingWP";
import SidebarWP from "@/src/components/sections/wall-painting/SidebarWP";
import { getListPaint } from "@/src/lib/api";
import { typePaint } from "@/src/lib/types/paint";
import { Box, Container, Grid } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";

const Search = () => {
  const router = useRouter();
  const { query } = router.query;

  const { data: listPaint, isLoading } = useQuery(
    ["listPaint", query],
    async () => {
      try {
        const res = await getListPaint({ title: query as string });
        return res.data.data;
      } catch (err) {
        throw err;
      }
    },
    {
      enabled: !!query,
      keepPreviousData: true,
    }
  );

  if (isLoading) return <Loading />;

  return (
    <Box py={4}>
      <Container>
        <SettingWP
          breadcrumb={["Tìm kiếm", `Kết quả tìm kiếm cho "${query}"`]}
        />
        <Box mt={12}>
          <Grid container spacing={12}>
            <Grid item md={3} display={{ xs: "none", md: "block" }}>
              <SidebarWP />
            </Grid>
            <Grid item xs={12} md={9}>
              {listPaint?.length > 0 ? (
                <Grid container spacing={4}>
                  {listPaint?.map((panting: typePaint) => (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={6}
                      lg={4}
                      key={panting._id}
                      onClick={() =>
                        router.push(`/detail-painting/${panting._id}`)
                      }
                    >
                      <CardItem
                        url={panting.url}
                        title={panting.title.toLocaleUpperCase()}
                      />
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Box
                  height={"100%"}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <Box component={"img"} src={"/img/png/NoData.png"} />
                </Box>
              )}
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Search;
Search.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout title="Tìm kiếm">{page}</MainLayout>;
};
