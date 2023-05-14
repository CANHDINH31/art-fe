import {
  Box,
  Container,
  Grid,
  Typography,
  keyframes,
  styled,
} from "@mui/material";
import React from "react";
import HomeTitle from "./common/HomeTitle";
import HomeProduct1 from "../../../../public/img/jpg/HomeProduct1.jpg";
import Image from "next/image";
import { listHomeProduct } from "./data";

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

const HomeProduct = () => {
  return (
    <Box>
      <Container>
        <HomeTitle title="TÁC PHẨM TRANH TƯỜNG MỚI" />
        <Box mt={8}>
          <Grid container spacing={4}>
            {listHomeProduct.map((homeProduct, index) => (
              <Grid item xs={3} key={index}>
                <WrapImage>
                  <Image src={homeProduct.src} alt="home-product" />
                  <WrapText>
                    <Typography color="white" variant="h6" fontWeight={"bold"}>
                      QUICK VIEW
                    </Typography>
                  </WrapText>
                </WrapImage>
                <Box display={"flex"} justifyContent={"center"} mt={2}>
                  <Typography
                    color="primary.main"
                    variant="h4"
                    fontWeight={"bold"}
                  >
                    {homeProduct.title}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default HomeProduct;
