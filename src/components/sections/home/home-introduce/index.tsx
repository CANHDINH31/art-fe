import * as React from "react";
import { Box, Container, Grid } from "@mui/material";
import HomeAccording from "./HomeAccording";
import Image from "next/image";
import HomeIntroduceImg from "../../../../../public/img/png/HomeIntroduce.png";

export default function HomeIntroduce() {
  return (
    <Container>
      <Grid container>
        <Grid item xs={12} md={6} lg={6}>
          <HomeAccording />
        </Grid>

        <Grid item xs={12} md={6} lg={6}>
          <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
            <Image
              src={HomeIntroduceImg}
              alt="home-introduce"
              style={{
                display: "block",
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
