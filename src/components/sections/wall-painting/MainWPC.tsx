import { Box, Grid, Pagination, Typography } from "@mui/material";
import CardItem from "@/src/components/sections/common/CardItem";
import Title from "@/src/components/sections/common/Title";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { getDetailCategory } from "@/src/lib/api";
import { typePaint } from "@/src/lib/types/paint";
import Loading from "../common/Loading";
import { toast } from "react-toastify";

const MainWPC = () => {
  const router = useRouter();
  const { data: detailCategory, isLoading } = useQuery(
    ["detailCategory", router.query.params],
    async () => {
      try {
        const res = await getDetailCategory(router.query.params as string);
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

  if (isLoading) return <Loading />;
  return (
    <Box>
      <Typography variant="h2" fontWeight={600} textAlign={"center"}>
        TRANH VẼ TƯỜNG - {detailCategory?.title.toUpperCase()}
      </Typography>
      <Typography mt={4} variant="h4">
        {detailCategory?.description}
      </Typography>
      <Box mt={12}>
        <Title title="Những Tác Phẩm Nổi Bật " />
      </Box>
      <Box mt={12}>
        <Grid container spacing={4}>
          {detailCategory?.list_paint_id?.map((panting: typePaint) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={6}
              lg={4}
              key={panting._id}
              onClick={() => router.push(`/detail-painting/${panting._id}`)}
            >
              <CardItem paint={panting} />
            </Grid>
          ))}
        </Grid>
      </Box>
      {/* <Box mt={8} display={"flex"} justifyContent={"center"}>
        <Pagination count={10} color="primary" />
      </Box> */}
    </Box>
  );
};

export default MainWPC;
