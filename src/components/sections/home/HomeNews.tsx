import React from "react";
import HomeTitle from "../common/Title";
import { Box, Container, Grid } from "@mui/material";
import Image from "next/image";
import { listHomeNews } from "./data";

const HomeNews = () => {
  return (
    <Box>
      <Container>
        <HomeTitle title="BÁO CHÍ NÓI VỀ CHÚNG TÔI" />
        <Box mt={8}>
          <Grid container spacing={4}>
            {listHomeNews.map((homeNews, index) => (
              <Grid item xs={3} key={index}>
                <Image
                  src={homeNews}
                  alt="home-news"
                  style={{
                    objectFit: "contain",
                    display: "block",
                    width: "100%",
                    height: "100%",
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default HomeNews;
