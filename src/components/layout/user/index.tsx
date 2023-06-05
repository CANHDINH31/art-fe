import React from "react";
import Footer from "./Footer";
import Head from "next/head";
import Header from "./header";
import ListContact from "./common/ListContact";
import ScrollToTop from "./ScrollToTop";
import { Box } from "@mui/material";

type Props = {
  children: JSX.Element;
  title?: string;
};

const MainLayout = ({ children, title }: Props) => {
  return (
    <>
      <Head>
        <title>{title || "Mỹ thuật Đông Anh"}</title>
      </Head>
      <Header />
      <Box width={"100vw"} overflow={"hidden"}>
        {children}
        <ListContact />
        <ScrollToTop />
        <Footer />
      </Box>
    </>
  );
};

export default MainLayout;
