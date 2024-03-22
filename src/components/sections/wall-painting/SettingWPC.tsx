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
import { typeCategory } from "@/src/lib/types";
import { infoRating } from "@/src/lib/utils/wall-painting";

type Props = {
  detailCategory: typeCategory | null;
  breadcrumb: string[];
  value: string;
  onChange: (value: string) => void;
};

const DrawerCustom = styled(Drawer)(({ theme }) => ({
  "& .MuiPaper-root": {
    background: theme.palette.common.white,
  },
}));

const SettingWPC = ({ breadcrumb, value, onChange, detailCategory }: Props) => {
  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false);

  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value as string);
  };

  const { totalScore, totalUsers } = infoRating(detailCategory as typeCategory);

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
          <Rating
            value={Math.round((totalScore / totalUsers) * 4) / 4}
            readOnly
            size="medium"
            precision={0.25}
          />
          <Typography variant="h4">
            {totalUsers > 0
              ? `Xếp hạng ${Math.round((totalScore / totalUsers) * 4) / 4} / 5`
              : "Chưa có đánh giá"}{" "}
            ( {totalUsers} phiếu bầu) trong{" "}
            {detailCategory?.list_paint_id?.length} sản phẩm
          </Typography>
        </Box>
        <Grid container>
          <Grid item xs={12} md={6}>
            <Stack
              justifyContent={"center"}
              height={"100%"}
              textAlign={"center"}
            >
              <Typography variant="h4" fontWeight={550} whiteSpace={"nowrap"}>
                Hiển thị 1– {detailCategory?.list_paint_id?.length} của{" "}
                {detailCategory?.list_paint_id?.length} kết quả
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Lọc theo</InputLabel>
              <Select
                label="Lọc theo"
                size="small"
                value={value}
                onChange={handleChange}
              >
                <MenuItem value={"1"}>Mới nhất</MenuItem>
                <MenuItem value={"2"}>Theo mức độ phổ biến</MenuItem>
                <MenuItem value={"3"}>Theo điểm đánh giá</MenuItem>
                <MenuItem value={"4"}>Theo giá: cao đến thấp</MenuItem>
                <MenuItem value={"5"}>Theo giá: thấp đến cao</MenuItem>
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
        <DrawerWP onClose={() => setIsOpenDrawer(false)} />
      </DrawerCustom>
    </Box>
  );
};

export default SettingWPC;
