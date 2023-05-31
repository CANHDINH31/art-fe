import React from "react";
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Rating,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import BreadcrumbsCustom from "../common/BreadcrumbsCustom";

const SettingWP = () => {
  const [filter, setFilter] = React.useState("1");

  const handleChange = (event: SelectChangeEvent) => {
    setFilter(event.target.value as string);
  };

  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Box>
        <BreadcrumbsCustom />
      </Box>
      <Stack spacing={2}>
        <Box display={"flex"} gap={2} alignItems={"center"}>
          <Rating value={5} readOnly size="medium" />
          <Typography variant="h4" color={"primary.main"}>
            Xếp hạng 4.76 / 5 (144 phiếu bầu) trong 1429 sản phẩm
          </Typography>
        </Box>
        <Grid container>
          <Grid item xs={6}>
            <Stack justifyContent={"center"} height={"100%"}>
              <Typography variant="h4" color={"primary.main"} fontWeight={550}>
                Hiển thị 55–108 của 1372 kết quả
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={6}>
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
    </Box>
  );
};

export default SettingWP;
