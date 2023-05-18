import { Box, Button, Typography, styled } from "@mui/material";
import Image from "next/image";
import React from "react";
import HomeContactImg from "../../../../public/img/jpg/HomeContact.jpg";
import { Stack } from "@mui/system";

const HomeContactWrap = styled(Box)(({ theme }) => ({
  position: "relative",
  "& .home-contact-img": {
    "& img": {
      display: "block",
      width: "100%",
      height: "100%",
    },
  },
  "& .home-contact-overlay": {
    cursor: "pointer",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translateY(-50%)",
    background: "rgba(0,0,0,.541)",
    padding: theme.spacing(12.5),
    borderRadius: theme.spacing(2),
  },
}));

const HomeContact = () => {
  return (
    <HomeContactWrap>
      <Box className="home-contact-img">
        <Image src={HomeContactImg} alt="home-contact" />
      </Box>
      <Box className="home-contact-overlay">
        <Typography
          color={"white"}
          variant="h3"
          fontWeight={"bold"}
          letterSpacing={1}
        >
          GHÉ THĂM MỸ THUẬT ĐÔNG ANH
        </Typography>
        <Typography color="white" mt={4}>
          Phòng Tranh Tranh Tường Nghệ Thuật & Đặc Sắc
        </Typography>
        <Typography color="white" mt={4}>
          Mở cửa hằng ngày từ 8h30 đến 18h30
        </Typography>
        <Typography color="white" mt={4}>
          Đóng cửa vào các dịp lễ, Tết
        </Typography>
        <Typography color="white" mt={4}>
          Vào cửa miễn phí
        </Typography>
        <Typography color="white" mt={4}>
          Địa chỉ: Đại Mạch, Đông Anh, Hà Nội.
        </Typography>
        <Stack mt={4} alignItems={"center"}>
          <Button variant="contained">
            <Typography variant="h4" fontWeight={"bold"}>
              LÊN LỊCH GHÉ THĂM
            </Typography>
          </Button>
        </Stack>
      </Box>
    </HomeContactWrap>
  );
};

export default HomeContact;
