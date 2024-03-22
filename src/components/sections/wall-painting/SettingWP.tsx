import React, { useState } from "react";
import { Box, Drawer, Typography, styled } from "@mui/material";
import BreadcrumbsCustom from "../common/BreadcrumbsCustom";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import DrawerWP from "./DrawerWP";

type Props = {
  breadcrumb: string[];
  isFilter?: boolean;
};

const DrawerCustom = styled(Drawer)(({ theme }) => ({
  "& .MuiPaper-root": {
    background: theme.palette.common.white,
  },
}));

const SettingWP = ({ breadcrumb, isFilter = true }: Props) => {
  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false);

  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
      sx={{ flexDirection: { xs: "column", md: "row" } }}
    >
      <Box>
        <BreadcrumbsCustom breadcrumb={breadcrumb} />
      </Box>
      {isFilter && (
        <>
          <Box
            display={{ xs: "flex", md: "none" }}
            mt={4}
            gap={2}
            sx={{ cursor: "pointer" }}
            onClick={() => setIsOpenDrawer(true)}
          >
            <AdjustmentsHorizontalIcon width={28} />
            <Typography fontWeight={"bold"}>LỌC</Typography>
          </Box>
          <DrawerCustom
            anchor="right"
            variant="temporary"
            open={isOpenDrawer}
            onClose={() => setIsOpenDrawer(false)}
          >
            <DrawerWP onClose={() => setIsOpenDrawer(false)} />
          </DrawerCustom>
        </>
      )}
    </Box>
  );
};

export default SettingWP;
