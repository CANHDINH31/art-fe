import MainLayout from "@/src/components/layout/user";
import CardItem from "@/src/components/sections/common/CardItem";
import SettingWP from "@/src/components/sections/wall-painting/SettingWP";
import SidebarWP from "@/src/components/sections/wall-painting/SidebarWP";
import { typePaint } from "@/src/lib/types";
import { Box, Container, Grid } from "@mui/material";
import { useRouter } from "next/router";
import React, { ReactElement, useEffect } from "react";
import { useSelector } from "react-redux";

const Favourite = () => {
  const { user } = useSelector((state: any) => state?.user);
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push("/");
  }, [user]);

  return (
    <Box py={4}>
      <Container>
        <SettingWP
          breadcrumb={[`Yêu thích (${user?.favourite?.length})`]}
          isFilter={false}
        />
        <Box mt={12}>
          <Grid container spacing={12}>
            <Grid item md={3} display={{ xs: "none", md: "block" }}>
              <SidebarWP />
            </Grid>
            <Grid item xs={12} md={9}>
              {user?.favourite?.length > 0 ? (
                <Grid container spacing={4}>
                  {user?.favourite?.map((panting: typePaint) => (
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
                      <CardItem paint={panting} />
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

export default Favourite;
Favourite.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout title="Yêu thích">{page}</MainLayout>;
};
