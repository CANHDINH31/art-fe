import React from "react";
import { Box, Stack, Typography, keyframes, styled } from "@mui/material";
import { HeartIcon } from "@heroicons/react/24/solid";
import { useMutation } from "@tanstack/react-query";
import { handleFavourite } from "@/src/lib/api/user";
import { useDispatch, useSelector } from "react-redux";
import { typePaint } from "@/src/lib/types";
import { favourite } from "@/src/lib/redux/userSlice";
import { toast } from "react-toastify";
import { convertCurrency } from "@/src/lib/utils/wall-painting";

type Props = {
  paint: typePaint;
};

const showText = keyframes`
  from {
    opacity: 0;
    transform: translateY(20%);
  }
  to {
    opacity: 1;
  }
`;

const WrapText = styled(Box)(({ theme }) => ({
  display: "none",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  position: "absolute",
  bottom: 0,
  height: 40,
  background: theme.palette.primary.main,
  left: 0,
  right: 0,
  animation: `${showText} .5s ease-out`,
}));

const WrapImage = styled(Box)(({}) => ({
  position: "relative",
  "&>img": {
    display: "block",
    width: "100%",
    height: 250,
    objectFit: "cover",
  },
  "&:hover div": {
    display: "flex",
  },
}));

const LikeButton = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  display: "none",
  position: "absolute",
  padding: theme.spacing(1.5),
  background: "rgba(240, 240, 240,0.6)",
  right: 4,
  top: 4,
  cursor: "pointer",
  borderRadius: theme.spacing(1),
  animation: `${showText} .5s ease-out`,
  "&::before": {
    position: "absolute",
    content: '""',
    left: -36,
    top: -4,
    width: 80,
    height: 80,
  },
}));

const CardItem = ({ paint }: Props) => {
  const { user } = useSelector((state: any) => state?.user);
  const dispatch = useDispatch();
  const handleLike = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    paint: typePaint
  ) => {
    e.stopPropagation();
    if (!user) {
      toast.warn("Bạn phải đăng nhập để sử dụng chức năng này");
    } else {
      mutate(paint?._id as string);
    }
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: handleFavourite,
    onSuccess: (res) => {
      const index = user?.favourite?.findIndex(
        (item: any) => item._id === paint._id
      );
      if (index > -1) {
        toast.success("Xóa khỏi yêu thích thành công");
      } else {
        toast.success("Thêm vào yêu thích thành công");
      }
      dispatch(favourite(paint));
    },
  });

  return (
    <Box sx={{ cursor: "pointer" }}>
      <WrapImage>
        <LikeButton onClick={(e) => handleLike(e, paint)}>
          {user?.favourite
            ?.map((e: { _id: string }) => e._id)
            ?.includes(paint._id) ? (
            <HeartIcon width={28} color="#d32f2f" />
          ) : (
            <HeartIcon width={28} color="#446084" />
          )}
        </LikeButton>
        <Box component={"img"} src={paint.url as string} alt="home-product" />
        <WrapText>
          <Typography color="white" variant="h6" fontWeight={"bold"}>
            XEM CHI TIẾT
          </Typography>
        </WrapText>
      </WrapImage>
      <Stack alignItems={"center"} mt={2}>
        <Typography variant="h5" fontWeight={"bold"}>
          {paint.title}
        </Typography>
        <Typography variant="h5" fontWeight={"bold"}>
          {convertCurrency(paint.price)}
        </Typography>
      </Stack>
    </Box>
  );
};

export default CardItem;
