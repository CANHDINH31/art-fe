import MainLayout from "@/src/components/layout/user";
import BreadcrumbsCustom from "@/src/components/sections/common/BreadcrumbsCustom";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Typography,
  styled,
} from "@mui/material";
import React, { ReactElement } from "react";
import { HeartIcon, ArrowsPointingOutIcon } from "@heroicons/react/24/solid";
import ModalZoomImage from "@/src/components/sections/common/ModalZoomImage";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { getDetailPaint } from "@/src/lib/api";
import Loading from "@/src/components/sections/common/Loading";

const ImagePainting = styled("img")(({ theme }) => ({
  width: "100%",
  height: "80vh",
  objectFit: "cover",
  borderRadius: theme.spacing(1),
}));

const DetailPainting = () => {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { data: detailPainting, isLoading } = useQuery(
    ["detailPainting", router.query.id],
    async () => {
      try {
        const res = await getDetailPaint(router.query.id as string);
        return res.data.data;
      } catch (err) {
        throw err;
      }
    },
    {
      enabled: !!router.query.id,
      keepPreviousData: true,
    }
  );

  if (isLoading) return <Loading />;
  return (
    <Box py={4}>
      <Container>
        <BreadcrumbsCustom breadcrumb={["Chi tiết tranh"]} />
        <Box mt={4}>
          <Grid container spacing={8}>
            <Grid item xs={12} md={8}>
              <ImagePainting src={detailPainting?.url} />
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h2" fontWeight={"bold"}>
                {detailPainting?.title.toUpperCase()}
              </Typography>
              <Box mt={4}>
                <Divider />
                <Typography py={2}>Mã: 31012001</Typography>
                <Divider />
                <Typography py={2}>Số lượt xem: 40096</Typography>
                <Divider />
                <Typography py={2}>
                  Danh mục: Tranh vẽ tường, tranh đồng quê
                </Typography>
                <Divider />
              </Box>
              <Box mt={4}>
                <Button variant="contained" size="large" color="error">
                  <Box display={"flex"} gap={2} alignItems={"center"}>
                    <HeartIcon width={20} />
                    <Typography variant="h4" color={"white"}>
                      Thêm vào yêu thích
                    </Typography>
                  </Box>
                </Button>
              </Box>
              <Box mt={4}>
                <Button
                  variant="contained"
                  size="large"
                  color="secondary"
                  onClick={handleOpen}
                >
                  <Box display={"flex"} gap={2} alignItems={"center"}>
                    <ArrowsPointingOutIcon width={20} />
                    <Typography variant="h4" color="white">
                      Phóng to
                    </Typography>
                  </Box>
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <ModalZoomImage
        image={detailPainting?.url as string}
        open={open}
        handleClose={handleClose}
      />
    </Box>
  );
};

export default DetailPainting;

DetailPainting.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout title="Tranh vẽ tường">{page}</MainLayout>;
};
