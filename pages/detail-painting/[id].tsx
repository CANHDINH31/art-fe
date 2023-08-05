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
import React, { ReactElement, useEffect } from "react";
import { HeartIcon, ArrowsPointingOutIcon } from "@heroicons/react/24/solid";
import ModalZoomImage from "@/src/components/sections/common/ModalZoomImage";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { addView, getDetailPaint } from "@/src/lib/api";
import Loading from "@/src/components/sections/common/Loading";
import { toast } from "react-toastify";
import moment from "moment";
import { listSocialIcon } from "@/src/components/layout/user/common/data";
import SocialIcon from "@/src/components/layout/user/common/SocialIcon";
import { listShareIcon } from "@/src/components/sections/detail-painting/data";

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
      } catch (err: any) {
        toast.error(err?.message || "Có lỗi xảy ra");
        throw err;
      }
    },
    {
      enabled: !!router.query.id,
      keepPreviousData: true,
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
                <Typography py={2}>Mã: {detailPainting?._id}</Typography>
                <Divider />
                <Typography py={2}>
                  Số lượt xem: {detailPainting?.views || 0}
                </Typography>
                <Divider />
                <Typography py={2}>
                  Ngày đăng:{" "}
                  {moment(detailPainting?.createdAt)?.format("DD-MM-YYYY")}
                </Typography>
                <Divider />
                <Box display={"flex"} alignItems={"center"} gap={4}>
                  <Typography py={2}>Chia sẻ: </Typography>
                  <Box display={"flex"} sx={{ cursor: "pointer" }} gap={4}>
                    {listShareIcon.map((social, index) => (
                      <SocialIcon
                        key={index}
                        icon={social.icon}
                        title={social.title}
                        href={social.href + detailPainting?._id}
                      />
                    ))}
                  </Box>
                </Box>
                <Divider />
              </Box>
              <Box mt={4} display={"flex"} gap={1} alignItems={"center"}>
                <Button variant="contained" color="primary" size="large">
                  <Box display={"flex"} gap={2} alignItems={"center"}>
                    <HeartIcon width={24} />
                    <Typography variant="h4" color={"white"}>
                      Thêm vào yêu thích
                    </Typography>
                  </Box>
                </Button>
                <Button
                  size="large"
                  variant="contained"
                  color="secondary"
                  onClick={handleOpen}
                  sx={{ display: { xs: "none", lg: "block" } }}
                >
                  <Box display={"flex"} gap={2} alignItems={"center"}>
                    <ArrowsPointingOutIcon width={24} />
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
