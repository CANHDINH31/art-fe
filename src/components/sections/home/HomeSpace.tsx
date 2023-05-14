import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { Box, Container, Typography, styled } from "@mui/material";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import HomeTitle from "./common/HomeTitle";
import { listHomeSpace } from "./data";

const CustomSwipper = styled(Swiper)(({ theme }) => ({
  cursor: "pointer",
  "& .swiper-slide img": {
    display: "block",
    width: 250,
    height: 250,
    objectFit: "cover",
    objectPosition: "center",
    borderRadius: "50%",
    border: `2px solid ${theme.palette.primary.main}`,
    boxShadow: "1px  1px 4px rgba(0, 0, 0, 0.5)",
  },
}));

const SwipperText = styled(Box)(({ theme }) => ({
  position: "absolute",
  bottom: 0,
  left: "50%",
  transform: "translateX(-50%)",
  padding: theme.spacing(1, 0),
  width: "60%",
  background: theme.palette.primary.main,
  borderRadius: theme.spacing(1),
  textAlign: "center",
  color: "white",
}));

const HomeSpace = () => {
  return (
    <Box>
      <Container>
        <HomeTitle title="KHÔNG GIAN TUYỆT VỚI HƠN KHI SỬ DỤNG VẼ TRANH TƯỜNG" />
        <Box mt={8}>
          <CustomSwipper slidesPerView={4} loop={true}>
            {listHomeSpace.map((homeSpace, index) => (
              <SwiperSlide key={index}>
                <Box
                  position={"relative"}
                  display={"flex"}
                  justifyContent={"center"}
                >
                  <Image src={homeSpace.image} alt={"home-space"} />
                  <SwipperText>
                    <Typography variant="h5">{homeSpace.name}</Typography>
                  </SwipperText>
                </Box>
              </SwiperSlide>
            ))}
          </CustomSwipper>
        </Box>
      </Container>
    </Box>
  );
};

export default HomeSpace;
