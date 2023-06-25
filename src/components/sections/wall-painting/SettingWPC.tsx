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

const SettingWPC = ({ breadcrumb }: Props) => {
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
      <Stack spacing={2}>
        <Box
          display={"flex"}
          gap={4}
          alignItems={"center"}
          sx={{ flexDirection: { xs: "column", md: "row" } }}
          mt={4}
        >
          <Rating value={5} readOnly size="medium" />
          <Typography variant="h4">
            Xếp hạng 4.76 / 5 (144 phiếu bầu) trong 1429 sản phẩm
          </Typography>
        </Box>
        <Grid container>
          <Grid item xs={12} md={6}>
            <Stack
              justifyContent={"center"}
              height={"100%"}
              textAlign={"center"}
            >
              <Typography variant="h4" fontWeight={550}>
                Hiển thị 55–108 của 1372 kết quả
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Lọc theo</InputLabel>
              <Select
                label="Lọc theo"
                size="small"
                value={filter}
                onChange={handleChange}
              >
                <MenuItem value={1}>Mới nhất</MenuItem>
                <MenuItem value={2}>Theo mức độ phổ biến</MenuItem>
                <MenuItem value={3}>Theo điểm đánh giá</MenuItem>
                <MenuItem value={4}>Theo giá: từ thấp đến cao</MenuItem>
                <MenuItem value={5}>Theo giá: từ cao đến thấp </MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Stack>
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

export default SettingWPC;
