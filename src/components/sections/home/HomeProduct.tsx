import { Box, Container, Grid } from "@mui/material";
import React from "react";
import HomeTitle from "../common/Title";
import { listHomeProduct } from "./data";
import CardItem from "../common/CardItem";

const HomeProduct = () => {
  return (
    <Box>
      <Container>
        <HomeTitle title="TÁC PHẨM TRANH TƯỜNG MỚI" />
        <Box mt={8}>
          <Grid container spacing={4}>
            {listHomeProduct.map((homeProduct, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <CardItem url={homeProduct.src} title={homeProduct.title} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default HomeProduct;
