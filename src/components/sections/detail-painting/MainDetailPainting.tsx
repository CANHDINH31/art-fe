import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Grid,
  Rating,
  Typography,
  styled,
} from "@mui/material";
import { listShareIcon } from "./data";
import SocialIcon from "../../layout/user/common/SocialIcon";
import ModalZoomImage from "../common/ModalZoomImage";
import moment from "moment";
import { useState } from "react";
import {
  ArrowsPointingOutIcon,
  HeartIcon,
  ShoppingCartIcon,
  PlusIcon,
  MinusIcon,
} from "@heroicons/react/24/outline";
import { typePaint } from "@/src/lib/types";
import { useMutation } from "@tanstack/react-query";
import { addToUserCart, handleFavourite } from "@/src/lib/api/user";
import { addToCart, favourite } from "@/src/lib/redux/userSlice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import ContactOrder from "./ContactOrder";
import { convertCurrency } from "@/src/lib/utils/wall-painting";
// @ts-ignore
import ImageZoom from "react-image-zooom";

type Props = {
  detailPainting: typePaint;
  scoreRating: number;
  user: any;
  category: string[];
};

const ImagePainting = styled(ImageZoom)(({ theme }) => ({
  width: "100%",
  objectFit: "contain",
  borderRadius: theme.spacing(1),
}));

const MainDetailPainting = ({
  detailPainting,
  scoreRating,
  user,
  category,
}: Props) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState<number>(1);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { mutate } = useMutation({
    mutationFn: handleFavourite,
    onSuccess: (res) => {
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

  const { mutate: mutateAddToCart } = useMutation({
    mutationFn: addToUserCart,
    onSuccess: (res) => {
      const index = user?.favourite?.findIndex(
        (item: any) => item._id === detailPainting._id
      );
      toast.success("Thêm vào giỏ hàng thành công");
      dispatch(addToCart({ paint: detailPainting, amount }));
    },
  });

  const handleLike = (paint: typePaint) => {
    if (!user) {
      toast.warn("Bạn phải đăng nhập để sử dụng chức năng này");
    } else {
      mutate(paint?._id as string);
    }
  };

  const handleAddToCart = (paint: typePaint) => {
    if (!user) {
      toast.warn("Bạn phải đăng nhập để sử dụng chức năng này");
    } else {
      mutateAddToCart({ paint: paint?._id as string, amount });
    }
  };

  return (
    <Box>
      <Grid container spacing={8}>
        <Grid item xs={12} md={8}>
          {detailPainting?.url && (
            <ImagePainting src={detailPainting?.url} zoom="200" />
          )}
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
                Danh mục: {category?.join(",")?.toUpperCase()}
              </Typography>
              <Typography py={2}>
                Giá: {convertCurrency(detailPainting?.price)}
              </Typography>
              <Divider />
              <Typography py={2}>
                Số lượt xem: {detailPainting?.views || 0}
              </Typography>
              <Divider />
              <Typography py={2}>
                Số lượng trong kho: {detailPainting?.stock || 0}
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
                {scoreRating > 0 ? (
                  <>
                    <Rating
                      value={Math.round(scoreRating * 4) / 4}
                      precision={0.25}
                      readOnly
                    />
                    <Typography>
                      ({Math.round(scoreRating * 4) / 4} / 5)
                    </Typography>
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
                variant="outlined"
                color={
                  user &&
                  user?.favourite?.findIndex(
                    (item: any) => item._id === detailPainting?._id
                  ) >= 0
                    ? "error"
                    : "secondary"
                }
                size="large"
                onClick={() => handleLike(detailPainting)}
              >
                <Box display={"flex"} gap={2} alignItems={"center"}>
                  <HeartIcon width={24} />
                  <Box component={"div"} fontSize={16}>
                    {user &&
                    user?.favourite?.findIndex(
                      (item: any) => item._id === detailPainting?._id
                    ) >= 0
                      ? "Yêu thích"
                      : "Thêm vào yêu thích"}
                  </Box>
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
            <Box mt={4} display={"flex"} gap={1} alignItems={"center"}>
              <ButtonGroup>
                <Button
                  onClick={() => {
                    setAmount(Math.max(amount - 1, 1));
                  }}
                >
                  <MinusIcon width={12} />
                </Button>
                <Button size="large">
                  <Typography variant="h4">{amount}</Typography>
                </Button>
                <Button
                  onClick={() => {
                    if (amount < Number(detailPainting.stock) - 1) {
                      setAmount(amount + 1);
                    }
                  }}
                >
                  <PlusIcon width={12} />
                </Button>
              </ButtonGroup>
              <Button
                size="large"
                variant="contained"
                fullWidth
                onClick={() => handleAddToCart(detailPainting)}
              >
                <Box display={"flex"} gap={2} alignItems={"center"}>
                  <ShoppingCartIcon width={24} />
                  <Typography variant="h4" color="white">
                    Thêm vào giỏ hàng
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
      <ModalZoomImage
        image={detailPainting?.url as string}
        open={open}
        handleClose={handleClose}
      />
    </Box>
  );
};

export default MainDetailPainting;
