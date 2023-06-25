import React, { useState } from "react";
import {
  Box,
  Drawer,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Rating,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import BreadcrumbsCustom from "../common/BreadcrumbsCustom";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import DrawerWP from "./DrawerWP";

type Props = {
  breadcrumb: string[];
};

const DrawerCustom = styled(Drawer)(({ theme }) => ({
  "& .MuiPaper-root": {
    background: theme.palette.common.white,
  },
}));

const SettingWP = ({ breadcrumb }: Props) => {
  const [filter, setFilter] = React.useState("1");
  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false);

  const handleChange = (event: SelectChangeEvent) => {
    setFilter(event.target.value as string);
  };
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
        <DrawerWP />
      </DrawerCustom>
    </Box>
  );
};

export default SettingWP;
