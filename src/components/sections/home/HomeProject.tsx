import { Box, Container, Typography, styled } from "@mui/material";
import HomeTitle from "./common/HomeTitle";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/image";
import { EffectCoverflow, Pagination, Navigation, Autoplay } from "swiper";
import { theme } from "@/src/styles";
import { listMainProject } from "./data";

const CustomSwipper = styled(Swiper)(({}) => ({
  marginTop: theme.spacing(4),
  paddingBottom: theme.spacing(16),
  "& .swiper-slide": {
    width: "50vw",
    height: "60vh",
    borderRadius: "2rem",
  },

  "& .swiper-slide img": {
    width: "50vw",
    height: "60vh",
    borderRadius: "2rem",
    objectFit: "cover",
  },
  "& .swiper-pagination": {
    marginTop: 200,
  },
}));

const NameProject = styled(Box)(({}) => ({
  textAlign: "center",
  position: "absolute",
  top: "100%",
  left: "50%",
  transform: "translateX(-50%)",
  background: theme.palette.primary.main,
  borderRadius: theme.spacing(1),
  padding: theme.spacing(1, 4),
}));

const HomeProject = () => {
  return (
    <Box>
      <Container>
        <HomeTitle title="DỰ ÁN TIÊU BIỂU " />
      </Container>
      <Box mt={8}>
        <CustomSwipper
          autoplay={{
            delay: 5000,
          }}
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 3,
            stretch: 0,
            depth: 200,
            modifier: 4,
            slideShadows: true,
          }}
          modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
        >
          {listMainProject.map((mainProject, index) => (
            <SwiperSlide key={index}>
              <Box position={"relative"}>
                <Image src={mainProject.image} alt={"main-project"} />
                <NameProject>
                  <Typography color="white" variant="h4" fontWeight={500}>
                    {mainProject.name}
                  </Typography>
                </NameProject>
              </Box>
            </SwiperSlide>
          ))}
        </CustomSwipper>
      </Box>
    </Box>
  );
};

export default HomeProject;
