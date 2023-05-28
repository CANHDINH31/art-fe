import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Parallax, Pagination, Navigation } from "swiper";
import { Box, Container, Typography, styled } from "@mui/material";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import HomeTitle from "../common/Title";
import Image from "next/image";
import Stars from "../../../../public/img/svg/Stars.svg";
import { listHomeCustomer } from "./data";

const CustomerSwipper = styled(Swiper)(() => ({
  "& .parallax-bg": {
    backgroundImage: `url("/img/jpg/BgHomeCustomer.jpg")`,
    position: "absolute",
    left: 0,
    top: 0,
    width: "130%",
    height: "100%",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
}));

const ContentCustomer = styled(Box)(({ theme }) => ({
  height: "50vh",
  display: "flex",
  paddingLeft: "10%",
  paddingRight: "10%",
  alignItems: "center",
  justifyContent: "flex-start",
  gap: theme.spacing(4),
  "& img": {
    display: "block",
    width: "100%",
    height: 300,
    objectFit: "cover",
  },
  "& .wrap_text": {
    padding: theme.spacing(10, 4),
    borderLeft: "1px solid #fff",
    "& img": {
      display: "block",
      height: 24,
      width: "max-content",
      objectFit: "contain",
    },
  },

  [theme.breakpoints.down("lg")]: {
    "& .wrap_text": {
      borderLeft: "none",
      "& img": {
        height: 22,
      },
    },
  },
  [theme.breakpoints.down("md")]: {
    "& .wrap_text": {
      borderLeft: "none",
      "& img": {
        height: 20,
      },
    },
  },
  [theme.breakpoints.down("sm")]: {
    "& .wrap_text": {
      borderLeft: "none",
      "& img": {
        height: 18,
      },
    },
  },
}));

export default function HomeCustomer() {
  return (
    <Box>
      <Container>
        <HomeTitle title="KHÁCH HÀNG NÓI VỀ CHÚNG TÔI" />
      </Container>
      <Box mt={8}>
        <CustomerSwipper
          speed={600}
          parallax={true}
          pagination={{
            clickable: true,
          }}
          loop={true}
          navigation={true}
          modules={[Parallax, Pagination, Navigation]}
        >
          <Box
            slot="container-start"
            className="parallax-bg"
            data-swiper-parallax="-23%"
          ></Box>
          {listHomeCustomer.map((homeCustomer, index) => (
            <SwiperSlide key={index}>
              <ContentCustomer>
                <Box
                  flex={1}
                  data-swiper-parallax="-300"
                  sx={{ display: { xs: "none", lg: "block" } }}
                >
                  <Image src={homeCustomer.img} alt="home-customer" />
                </Box>
                <Box className="wrap_text" flex={2}>
                  <Image src={Stars} alt="vote" />
                  <Typography
                    color={"white"}
                    data-swiper-parallax="-200"
                    sx={{ fontSize: { xs: 14, sm: 16, md: 18, lg: 20 } }}
                    fontWeight={"bold"}
                    mt={2}
                  >
                    {homeCustomer.title}
                  </Typography>
                  <Typography
                    color={"white"}
                    data-swiper-parallax="-100"
                    mt={4}
                    sx={{ fontSize: { xs: 12, sm: 14, md: 16 } }}
                  >
                    {homeCustomer.content}
                  </Typography>
                </Box>
              </ContentCustomer>
            </SwiperSlide>
          ))}
        </CustomerSwipper>
      </Box>
    </Box>
  );
}
