import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { Box, Container, Typography, styled } from "@mui/material";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import HomeTitle from "../common/Title";
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

  [theme.breakpoints.down("sm")]: {
    "& .swiper-slide img": {
      width: 168,
      height: 168,
    },
  },
}));

const SwipperText = styled(Box)(({ theme }) => ({
  position: "absolute",
  bottom: 0,
  left: "50%",
  transform: "translateX(-50%)",
  padding: theme.spacing(1, 5),
  background: theme.palette.primary.main,
  borderRadius: theme.spacing(1),
  textAlign: "center",
  color: "white",
  whiteSpace: "nowrap",
  [theme.breakpoints.down("sm")]: {
    "& h5": {
      fontSize: 12,
    },
  },
}));

const HomeSpace = () => {
  return (
    <Box>
      <Container>
        <HomeTitle title="KHÔNG GIAN TUYỆT VỚI HƠN KHI SỬ DỤNG VẼ TRANH TƯỜNG" />
        <Box mt={8}>
          <CustomSwipper
            loop={true}
            slidesPerView={2}
            breakpoints={{
              600: {
                slidesPerView: 2,
              },
              800: {
                slidesPerView: 3,
              },
              1200: {
                slidesPerView: 4,
              },
            }}
          >
            {listHomeSpace.map((homeSpace, index) => (
              <SwiperSlide key={index}>
                <Box
                  position={"relative"}
                  display={"flex"}
                  justifyContent={"center"}
                >
                  <Image src={homeSpace.image} alt={"home-space"} />
                  <SwipperText>
                    <Typography variant="h5" color={"white"}>
                      {homeSpace.name}
                    </Typography>
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
