import DataGridCustom from "@/src/components/common/DataGridCustom";
import AdminLayout from "@/src/components/layout/admin";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import {
  Box,
  Button,
  Stack,
  TextField,
  TextareaAutosize,
  Typography,
  styled,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";

const PaintingManagementDetail = () => {
  const router = useRouter();
  return (
    <Box>
      <Box
        display={"flex"}
        alignItems={"center"}
        gap={1}
        sx={{ cursor: "pointer" }}
        onClick={() => router.push("/admin/libraries/paintings-management")}
      >
        <ChevronLeftIcon height={18} />
        <Typography>Quay lại quản lý tranh</Typography>
      </Box>
      <Box mt={8} display={"flex"} justifyContent={"center"} gap={4}>
        <Box>
          <Box
            component={"img"}
            src={
              "https://i.pinimg.com/736x/7c/b5/49/7cb5492889809cb8303b76b80759f0df.jpg"
            }
            sx={{
              width: 250,
              height: 250,
              objectFit: "cover",
              borderRadius: 2,
            }}
          />
        </Box>
        <Stack justifyContent={"space-around"}>
          <Box>
            <TextField
              sx={{ width: 500 }}
              placeholder="Nhập đường link tranh"
              variant="standard"
            />
          </Box>
          <Box mt={4}>
            <TextField
              sx={{ width: 500 }}
              placeholder="Nhập tên tranh"
              variant="standard"
            />
          </Box>

          <Box mt={4} display={"flex"} justifyContent={"center"}>
            <Button variant="contained">Lưu</Button>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default PaintingManagementDetail;

PaintingManagementDetail.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout title="Quản lý thư viện">{page}</AdminLayout>;
};
