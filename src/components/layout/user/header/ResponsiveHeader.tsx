import { Box, Drawer, Fab, Paper, styled } from "@mui/material";
import Image from "next/image";
import Logo from "../../../../../public/img/png/logo.png";
import ListSocial from "../common/ListSocial";
import { ListBulletIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import DrawerHeader from "./DrawerHeader";
import { useRouter } from "next/router";

const DrawerCustom = styled(Drawer)(({ theme }) => ({
  "& .MuiPaper-root": {
    background: "rgba(255,255,255,0.95)",
  },
}));

const ResponsiveHeader = () => {
  const router = useRouter();
  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false);

  return (
    <Paper elevation={3} sx={{ display: { xs: "block", lg: "none" } }}>
      <Box
        p={2}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Fab color="primary" size="small" onClick={() => setIsOpenDrawer(true)}>
          <ListBulletIcon width={25} />
        </Fab>
        <Image
          src={Logo}
          alt="logo-icon"
          height={70}
          onClick={() => router.push("/")}
        />
        <ListSocial />
      </Box>
      <DrawerCustom
        variant="temporary"
        open={isOpenDrawer}
        onClose={() => setIsOpenDrawer(false)}
      >
        <DrawerHeader onClose={() => setIsOpenDrawer(false)} />
      </DrawerCustom>
    </Paper>
  );
};

export default ResponsiveHeader;
