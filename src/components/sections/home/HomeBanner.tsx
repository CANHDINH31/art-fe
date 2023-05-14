import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import Image from "next/image";
import { Box, Container, Typography, styled } from "@mui/material";
import { Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { listHomeBanner } from "./data";

const CustomSwipper = styled(Swiper)(({}) => ({
  "& .swiper-slide img": {
    display: "block",
    width: "100%",
    height: "90vh",
    objectFit: "cover",
    objectPosition: "center",
  },
}));

const HomeBanner = () => {
  return (
    <Box>
      <CustomSwipper
        autoplay={{
          delay: 5000,
        }}
        slidesPerView={1}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation, Autoplay]}
      >
        {listHomeBanner.map((homeBanner, index) => (
          <SwiperSlide key={index}>
            <Image src={homeBanner} alt={"home-banner"} />
          </SwiperSlide>
        ))}
      </CustomSwipper>
      <Box mt={2}>
        <Container>
          <Box display={"flex"} justifyContent={"center"}>
            <Typography variant="h5" color="primary.main">
              Tranh tường Hà Nội – Họa sỹ chuyên vẽ tranh tường 3D, tranh sơn
              thủy, phong cảnh, trang trí quá cafe, nhà hàng, tranh mầm non … rẻ
              đẹp nhất miền Bắc
            </Typography>
            <Box></Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default HomeBanner;
