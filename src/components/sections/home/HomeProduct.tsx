import { Box, Container, Grid } from "@mui/material";
import React from "react";
import HomeTitle from "../common/Title";
import CardItem from "../common/CardItem";
import { getListPaint } from "@/src/lib/api";
import { useQuery } from "@tanstack/react-query";
import { typePaint } from "@/src/lib/types/paint";
import { useRouter } from "next/router";
import Loading from "../common/Loading";

const HomeProduct = () => {
  const router = useRouter();
  const { data: listPaint, isLoading } = useQuery(
    ["listPaint"],
    async () => {
      try {
        const res = await getListPaint({
          limit: "12",
        });
        return res.data.data;
      } catch (err) {
        throw err;
      }
    },
    { keepPreviousData: true }
  );
  if (isLoading) return <Loading />;
  return (
    <Box>
      <Container>
        <HomeTitle title="TÁC PHẨM TRANH TƯỜNG MỚI" />
        <Box mt={8}>
          <Grid container spacing={4}>
            {listPaint?.map((paint: typePaint) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={paint?._id}
                onClick={() => router.push(`/detail-painting/${paint._id}`)}
              >
                <CardItem url={paint.url} title={paint?.title.toUpperCase()} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default HomeProduct;
