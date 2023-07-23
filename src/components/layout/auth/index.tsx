import useAuth from "@/src/lib/hooks/useAuth";
import { Box, Grid, Paper } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import React, {
  ReactElement,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";

type Props = {
  children: ReactElement;
  title?: string;
  src?: string;
};

const AuthLayout = ({ children, title, src }: Props) => {
  const router = useRouter();
  const { user } = useAuth();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (user) setCurrentUser(user);
  }, [user]);

  useEffect(() => {
    if (currentUser && router.pathname !== "/auth/change-password")
      router.push("/");
  }, [currentUser, router]);

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
        <Box width={{ xs: "90%", sm: "70%", md: "50%", lg: "60%" }}>
          <Paper elevation={3}>
            <Grid container>
              <Grid item xs={6} lg={6} display={{ xs: "none", lg: "block" }}>
                <Box height={550}>
                  <Box
                    component={"img"}
                    src={src ? src : "/img/jpg/Auth.jpg"}
                    sx={{
                      display: "block",
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderTopLeftRadius: 4,
                      borderBottomLeftRadius: 4,
                    }}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} lg={6} p={8}>
                {children}
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Box>
    </>
  );
};

export default AuthLayout;
