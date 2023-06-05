import { Box, Divider, Stack } from "@mui/material";
import Head from "next/head";
import React, { ReactElement } from "react";
import HeaderAdmin from "./HeaderAdmin";
import SideBar from "./SideBar";

type Props = {
  children: ReactElement;
  title?: string;
};

const AdminLayout = ({ children, title }: Props) => {
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
          <Box
            mt={1}
            flex={1}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            bgcolor={"#F7F8FB"}
          >
            {children}
          </Box>
        </Box>
      </Stack>
    </>
  );
};

export default AdminLayout;
