import MainLayout from "@/src/components/layout/user";
import BreadcrumbsCustom from "@/src/components/sections/common/BreadcrumbsCustom";
import { Box, Container, Grid } from "@mui/material";
import React, { ReactElement, useEffect } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { addView, getDetailPaint, getListPaintRelation } from "@/src/lib/api";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import YourRating from "@/src/components/sections/detail-painting/YourRating";
import Comment from "@/src/components/sections/detail-painting/Comment";
import PaintRelation from "@/src/components/sections/detail-painting/PaintRelation";
import MainDetailPainting from "@/src/components/sections/detail-painting/MainDetailPainting";

const DetailPainting = () => {
  const { user } = useSelector((state: any) => state?.user);
  const router = useRouter();

  const { data: detailPainting, refetch } = useQuery(
    ["detailPainting", router.query.id],
    async () => {
      try {
        const res = await getDetailPaint(router.query.id as string);
        return res.data.data;
      } catch (err: any) {
        toast.error(err?.message || "Có lỗi xảy ra");
        throw err;
      }
    },
    {
      enabled: !!router.query.id,
    }
  );

  const { data: listPaintRelation } = useQuery(
    ["listPaintRelation", router.query.id],
    async () => {
      const res = await getListPaintRelation(router.query.id as string);
      return res.data.data;
    },
    {
      enabled: !!router.query.id,
    }
  );

  useEffect(() => {
    const addViewForPaint = async () => {
      try {
        await addView(router.query.id as string);
      } catch (error) {
        throw error;
      }
    };

    router.query.id && addViewForPaint();
  }, [router.query.id]);

  return (
    <Box py={4}>
      <Container>
        <BreadcrumbsCustom breadcrumb={["Chi tiết tranh"]} />
        <Box mt={4}>
          <MainDetailPainting
            detailPainting={detailPainting}
            scoreRating={Number(
              detailPainting?.total_score / detailPainting?.account_users_rate
            )}
            user={user}
            category={listPaintRelation?.title}
          />
        </Box>
        <Box mt={8}>
          <Grid container>
            <Grid item xs={12} md={8}>
              <Box display={"flex"} justifyContent={"flex-start"}>
                <YourRating
                  refetch={refetch}
                  paintId={detailPainting?._id}
                  isAuth={Boolean(user)}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box mt={8}>
          <Grid
            container
            spacing={8}
            direction={{ xs: "column-reverse", md: "row" }}
          >
            <Grid item md={8} xs={12}>
              <Comment paintId={detailPainting?._id} />
            </Grid>
            <Grid item md={4} xs={12}>
              <PaintRelation
                listPaint={listPaintRelation?.listPaint?.filter(
                  (i: { _id: string }) => i?._id !== router.query.id
                )}
              />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default DetailPainting;

DetailPainting.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout title="Tranh vẽ tường">{page}</MainLayout>;
};
