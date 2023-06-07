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

const ImagePainting = styled("img")(({ theme }) => ({
  width: "100%",
  objectFit: "cover",
  height: "auto",
  borderRadius: theme.spacing(1),
}));

const DetailPainting = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Box py={4}>
      <Container>
        <BreadcrumbsCustom />
        <Box mt={4}>
          <Grid container spacing={8}>
            <Grid item xs={12} md={8}>
              <ImagePainting
                src={
                  "https://tranhtuongmienbac.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FHomeProduct2.5724f7a4.jpg&w=1920&q=75"
                }
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h2" fontWeight={"bold"}>
                Tranh Đồng Quê
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
                    <Typography variant="h4">Thêm vào yêu thích</Typography>
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
                    <Typography variant="h4">Phóng to</Typography>
                  </Box>
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <ModalZoomImage open={open} handleClose={handleClose} />
    </Box>
  );
};

export default DetailPainting;

DetailPainting.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout title="Tranh vẽ tường">{page}</MainLayout>;
};
