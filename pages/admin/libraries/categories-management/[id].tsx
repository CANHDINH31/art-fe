import DataGridCustom from "@/src/components/common/DataGridCustom";
import AdminLayout from "@/src/components/layout/admin";
import {
  ChevronLeftIcon,
  GlobeAltIcon,
  PencilSquareIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  Box,
  Button,
  Link,
  Stack,
  TextField,
  TextareaAutosize,
  Typography,
  styled,
} from "@mui/material";
import { GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";

const WrapTextarea = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(4),
  maxHeight: 200,
  padding: theme.spacing(2, 2),
  width: 500,
  overflow: "scroll",
  border: "1px solid rgba(0, 0, 0, 0.42)",
  borderRadius: theme.spacing(1),
  "&::-webkit-scrollbar": {
    display: "none",
  },
}));

const TextareaCustom = styled(TextareaAutosize)(({ theme }) => ({
  resize: "none",
  width: "100%",
  outline: "none",
  border: "none",
  fontSize: 14,
  fontFamily: "Roboto",
  "&::placeholder": {
    opacity: 0.6,
  },
}));
const rows: GridRowsProp = [
  {
    id: 1,
    name: "Tranh Vẽ Tường ",
    image:
      "https://i.pinimg.com/736x/7c/b5/49/7cb5492889809cb8303b76b80759f0df.jpg",
  },
  {
    id: 2,
    name: "Tranh Vẽ Tường ",
    image:
      "https://i.pinimg.com/736x/7c/b5/49/7cb5492889809cb8303b76b80759f0df.jpg",
  },
  {
    id: 3,
    name: "Tranh Vẽ Tường ",
    image:
      "https://i.pinimg.com/736x/7c/b5/49/7cb5492889809cb8303b76b80759f0df.jpg",
  },
];

const columns: GridColDef[] = [
  {
    field: "image",
    headerName: "Ảnh đại diện",
    sortable: false,
    filterable: false,
    width: 350,
    renderCell(params) {
      return (
        <Box
          component={"img"}
          src={params.row.image}
          sx={{ width: 120, height: 120, objectFit: "cover", borderRadius: 2 }}
        />
      );
    },
  },
  { field: "name", headerName: "Tên", width: 350 },
  {
    field: "action",
    headerName: "Hành động",
    sortable: false,
    filterable: false,
    width: 300,
    renderCell(param) {
      return (
        <Box display={"flex"} gap={4}>
          <Link href={`/admin/libraries/categories-management/${param.row.id}`}>
            <PencilSquareIcon width={30} color="#1976d2" />
          </Link>
          <Link href={`/wall-painting/${param.row.id}`}>
            <GlobeAltIcon width={30} color="#2e7d32" />
          </Link>
          <Link href={`/wall-painting/${param.row.id}`}>
            <XMarkIcon width={30} color="#d32f2f" />
          </Link>
        </Box>
      );
    },
  },
];
const CategoriesManagementDetail = () => {
  const router = useRouter();
  return (
    <Box>
      <Box
        display={"flex"}
        alignItems={"center"}
        gap={1}
        sx={{ cursor: "pointer" }}
        onClick={() => router.push("/admin/libraries/categories-management")}
      >
        <ChevronLeftIcon height={18} />
        <Typography>Quay lại quản lý danh mục</Typography>
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
          <Typography
            variant="h4"
            fontWeight={600}
            mt={1}
            textAlign={"center"}
            textTransform={"uppercase"}
          >
            Tranh vẽ tường
          </Typography>
        </Box>
        <Stack>
          <TextField
            sx={{ width: 500 }}
            placeholder="Đường link ảnh đại diện"
            variant="standard"
          />
          <WrapTextarea>
            <TextareaCustom
              minRows={10}
              placeholder="Nhập mô tả"
              spellCheck={false}
            />
          </WrapTextarea>
          <Box mt={1} display={"flex"} justifyContent={"flex-end"}>
            <Button variant="contained">Lưu</Button>
          </Box>
        </Stack>
      </Box>
      <Box mt={8}>
        <DataGridCustom
          rows={rows}
          columns={columns}
          hideFooter={true}
          rowHeight={150}
        />
      </Box>
      <Box mt={4} display={"flex"} justifyContent={"center"}>
        <Button variant="contained">Lưu</Button>
      </Box>
    </Box>
  );
};

export default CategoriesManagementDetail;

CategoriesManagementDetail.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout title="Quản lý thư viện">{page}</AdminLayout>;
};
