import { Box, Divider, Paper, Stack, Typography } from "@mui/material";
import Head from "next/head";
import React, { ReactElement } from "react";
import HeaderAdmin from "./HeaderAdmin";
import SideBar from "./SideBar";

type Props = {
  children: ReactElement;
  title?: string;
  page?: string;
};

const AdminLayout = ({ children, title, page }: Props) => {
  return (
    <>
      <Head>
        <title>{title || "Mỹ thuật Đông Anh"}</title>
      </Head>
      <Stack>
        <HeaderAdmin />
        <Box display={"flex"} height={"calc(100vh - 100px)"}>
          <Box width={"14%"} minWidth={250}>
            <SideBar />
          </Box>
          <Divider orientation="vertical" flexItem />
          <Box mt={1} flex={1} bgcolor={"#F7F8FB"}>
            <Stack p={5} height={"100%"}>
              <Typography fontWeight={600} color={"primary.main"} variant="h2">
                {page?.toUpperCase()}
              </Typography>
              <Box mt={2} flex={1} height={"100%"}>
                <Paper sx={{ height: "100%", px: 4, py: 4 }}>{children}</Paper>
              </Box>
            </Stack>
          </Box>
        </Box>
      </Stack>
    </>
  );
};

export default AdminLayout;
