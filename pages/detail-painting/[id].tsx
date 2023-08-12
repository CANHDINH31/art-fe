import MainLayout from "@/src/components/layout/user";
import BreadcrumbsCustom from "@/src/components/sections/common/BreadcrumbsCustom";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Rating,
  Typography,
  styled,
} from "@mui/material";
import React, { ReactElement, useEffect } from "react";
import { HeartIcon, ArrowsPointingOutIcon } from "@heroicons/react/24/solid";
import ModalZoomImage from "@/src/components/sections/common/ModalZoomImage";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addView, getDetailPaint } from "@/src/lib/api";
import { toast } from "react-toastify";
import moment from "moment";
import SocialIcon from "@/src/components/layout/user/common/SocialIcon";
import { listShareIcon } from "@/src/components/sections/detail-painting/data";
import { handleFavourite } from "@/src/lib/api/user";
import { useDispatch, useSelector } from "react-redux";
import { favourite } from "@/src/lib/redux/userSlice";
import { typePaint } from "@/src/lib/types";
import ContactOrder from "@/src/components/sections/detail-painting/ContactOrder";
import YourRating from "@/src/components/sections/detail-painting/YourRating";
import { findManyRateById } from "@/src/lib/api/rate";
import { scoreAvgRating } from "@/src/lib/utils/detail-painting";
import Comment from "@/src/components/sections/detail-painting/Comment";

const ImagePainting = styled("img")(({ theme }) => ({
  width: "100%",
  height: "80vh",
  objectFit: "cover",
  borderRadius: theme.spacing(1),
}));

const DetailPainting = () => {
  const { user } = useSelector((state: any) => state?.user);
  const dispatch = useDispatch();
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [scoreRating, setScoreRating] = React.useState<string>("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { data: detailPainting } = useQuery(
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

  const { mutate } = useMutation({
    mutationFn: handleFavourite,
    onSuccess: res => {
      const index = user?.favourite?.findIndex(
        (item: any) => item._id === detailPainting._id
      );
      if (index > -1) {
        toast.success("Xóa khỏi yêu thích thành công");
      } else {
        toast.success("Thêm vào yêu thích thành công");
      }
      dispatch(favourite(detailPainting));
    },
  });

  const handleLike = (paint: typePaint) => {
    if (!user) {
      toast.warn("Bạn phải đăng nhập để sử dụng chức năng này");
    } else {
      mutate(paint?._id as string);
    }
  };

  useEffect(() => {
    const addViewForPaint = async () => {
      try {
        await addView(router.query.id as string);
      } catch (error) {
        throw error;
      }
    };
    const getScoreVote = async () => {
      try {
        const res = await findManyRateById(router.query.id as string);
        if (res.data?.length > 0) {
          const score = scoreAvgRating(res.data);
          setScoreRating(score.toString());
        }
      } catch (error) {
        throw error;
      }
    };
    router.query.id && addViewForPaint();
    router.query.id && getScoreVote();
  }, [router.query.id]);

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
              <Box>
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
                  <Box display={"flex"} alignItems={"flex-end"} gap={4} py={2}>
                    <Typography>Chia sẻ: </Typography>
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
                  <Box py={2} display={"flex"} alignItems={"flex-end"} gap={4}>
                    <Typography>Đánh giá:</Typography>
                    {scoreRating ? (
                      <>
                        <Rating
                          value={Number(scoreRating)}
                          precision={0.25}
                          readOnly
                        />
                        <Typography>({scoreRating} / 5)</Typography>
                      </>
                    ) : (
                      <Typography>Chưa có đánh giá</Typography>
                    )}
                  </Box>
                  <Divider />
                </Box>
                <Box mt={4} display={"flex"} gap={1} alignItems={"center"}>
                  <Button
                    sx={{ width: { xs: "100%", lg: "auto" } }}
                    variant="contained"
                    color={
                      user &&
                      !user?.favourite?.findIndex(
                        (item: any) => item._id === detailPainting?._id
                      )
                        ? "error"
                        : "primary"
                    }
                    size="large"
                    onClick={() => handleLike(detailPainting)}
                  >
                    <Box display={"flex"} gap={2} alignItems={"center"}>
                      <HeartIcon width={24} />
                      <Typography variant="h4" color={"white"}>
                        {user &&
                        !user?.favourite?.findIndex(
                          (item: any) => item._id === detailPainting?._id
                        )
                          ? "Yêu thích"
                          : "Thêm vào yêu thích"}
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
              </Box>
              <Box mt={12}>
                <ContactOrder />
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box mt={8}>
          <Grid container>
            <Grid item xs={12} md={8}>
              <Box display={"flex"} justifyContent={"flex-start"}>
                <YourRating
                  paintId={detailPainting?._id}
                  isAuth={Boolean(user)}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box mt={8}>
          <Grid container>
            <Grid item lg={8} xs={12}>
              <Comment paintId={detailPainting?._id} />
            </Grid>
            <Grid item xs={4}></Grid>
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
