import { Box, Divider, Paper, Stack, Typography } from "@mui/material";
import Head from "next/head";
import React, { ReactElement, useEffect, useState } from "react";
import HeaderAdmin from "./HeaderAdmin";
import SideBar from "./SideBar";
import { useRouter } from "next/router";
import useAuth from "@/src/lib/hooks/useAuth";

type Props = {
  children: ReactElement;
  title?: string;
  page?: string;
};

const AdminLayout = ({ children, title, page }: Props) => {
  const router = useRouter();
  const { user } = useAuth();
  const [currentUser, setCurrentUser] = useState<{ isAdmin?: boolean }>({});
  const [isCurrentUserSet, setIsCurrentUserSet] = useState(false);

  useEffect(() => {
    if (user) setCurrentUser(user);
  }, [user]);

  useEffect(() => {
    if (isCurrentUserSet && !currentUser?.isAdmin) {
      router.push("/");
    }
  }, [currentUser, isCurrentUserSet, router]);

  useEffect(() => {
    if (Object.keys(currentUser).length > 0) {
      setIsCurrentUserSet(true);
    }
  }, [currentUser]);

  return (
    <>
      <Box display={{ xs: "none", lg: "block" }}>
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
                <Typography fontWeight={600} variant="h2">
                  {page?.toUpperCase()}
                </Typography>
                <Box mt={2} flex={1} height={"100%"}>
                  <Paper
                    sx={{
                      height: "75vh",
                      width: "80vw",
                      px: 4,
                      py: 4,
                      overflow: "scroll",
                    }}
                  >
                    {children}
                  </Paper>
                </Box>
              </Stack>
            </Box>
          </Box>
        </Stack>
      </Box>
      <Box
        display={{ xs: "block", lg: "none" }}
        width={"100vw"}
        height={"100vh"}
      >
        <Box
          component="img"
          src={"/img/jpg/register.jpg"}
          sx={{
            width: "100vw",
            height: "100vh",
            objectFit: "cover",
            objectPosition: "bottom",
          }}
        />
      </Box>
    </>
  );
};

export default AdminLayout;
