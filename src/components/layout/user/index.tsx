import React, { useEffect } from "react";
import Footer from "./Footer";
import Head from "next/head";
import Header from "./header";
import ListContact from "./common/ListContact";
import ScrollToTop from "./ScrollToTop";
import { Box } from "@mui/material";
import {
  clearToken,
  isValidToken,
  setRefreshToken,
  setToken,
} from "@/src/lib/utils/jwt";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "next-auth/react";
import { logout } from "@/src/lib/redux/userSlice";
import { createAccess, getRefreshToken } from "@/src/lib/api";

type Props = {
  children: JSX.Element;
  title?: string;
};

const MainLayout = ({ children, title }: Props) => {
  const { user } = useSelector((state: any) => state?.user);
  const dispatch = useDispatch();
  const handleLogout = () => {
    localStorage.removeItem("visit");
    clearToken();
    signOut();
    dispatch(logout());
  };

  useEffect(() => {
    const checkValidToken = async () => {
      const accessToken = localStorage?.getItem("access_token");
      const refreshToken = localStorage?.getItem("refresh_token");

      if ((!accessToken || !refreshToken) && user) {
        handleLogout();
      }
      if (refreshToken && !isValidToken(refreshToken)) {
        handleLogout();
      }

      if (
        accessToken &&
        !isValidToken(accessToken) &&
        isValidToken(refreshToken)
      ) {
        const res = await getRefreshToken({
          refreshToken: refreshToken as string,
        });
        setToken(res.data.accessToken);
        setRefreshToken(res.data.refreshToken);
      }
    };
    checkValidToken();
  }, []);

  useEffect(() => {
    const addAccess = async () => {
      try {
        await createAccess({ visit: localStorage.getItem("visit") as string });
      } catch (error) {
        throw error;
      }
    };
    addAccess();
  }, []);

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
