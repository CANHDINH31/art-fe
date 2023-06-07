import { Box, Grid } from "@mui/material";
import Head from "next/head";
import React, { ReactElement } from "react";

type Props = {
  children: ReactElement;
  title?: string;
};

const AuthLayout = ({ children, title }: Props) => {
  return (
    <>
      <Head>
        <title>{title || "Mỹ thuật Đông Anh"}</title>
      </Head>
      <Box
        width="100vw"
        height="100vh"
        overflow="hidden"
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Grid
          container
          width={"60%"}
          border={"1px solid rgba(0,0,0,.125)"}
          borderRadius={4}
        >
          <Grid item xs={6}>
            <Box
              component={"img"}
              src={"https://seamaf.com/frontend/img/background.jpg"}
              width={"100%"}
              height={"100%"}
              sx={{
                objectFit: "cover",
                borderTopLeftRadius: 16,
                borderBottomLeftRadius: 16,
              }}
            />
          </Grid>
          <Grid item xs={6} p={8}>
            {children}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default AuthLayout;
