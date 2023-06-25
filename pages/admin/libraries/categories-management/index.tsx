import DataGridCustom from "@/src/components/common/DataGridCustom";
import AdminLayout from "@/src/components/layout/admin";
import Tab from "@/src/components/sections/admin/libraries/Tab";
import Loading from "@/src/components/sections/common/Loading";
import { getListCategory } from "@/src/lib/api";
import { typeCategory } from "@/src/lib/types";
import { GlobeAltIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { Box, Link } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import React, { ReactElement } from "react";

const columns: GridColDef[] = [
  {
    field: "image",
    headerName: "Ảnh đại diện",
    sortable: false,
    filterable: false,
    width: 150,
    renderCell(params) {
      return (
        <Box
          component={"img"}
          src={params.row.url}
          sx={{ width: 120, height: 120, objectFit: "cover", borderRadius: 2 }}
        />
      );
    },
  },
  { field: "title", headerName: "Loại", width: 150 },
  {
    field: "description",
    headerName: "Mô tả",
    width: 400,
  },
  { field: "view", headerName: "Số lượt xem", width: 150 },
  {
    field: "count",
    headerName: "Số tác phẩm",
    width: 150,
    renderCell(param) {
      return <span>{param.row.list_paint_id?.length}</span>;
    },
  },
  {
    field: "action",
    headerName: "Hành động",
    sortable: false,
    filterable: false,
    width: 100,
    renderCell(param) {
      return (
        <Box display={"flex"} gap={4}>
          <Link
            href={`/admin/libraries/categories-management/${param.row._id}`}
          >
            <PencilSquareIcon width={30} color="#1976d2" />
          </Link>
          <Link href={`/wall-painting/${param.row._id}`}>
            <GlobeAltIcon width={30} color="#2e7d32" />
          </Link>
        </Box>
      );
    },
  },
];

const CategoriesManagement = () => {
  const { data: listCategories, isLoading } = useQuery(
    ["listCategories"],
    async () => {
      try {
        const res = await getListCategory();
        const listCategories = res.data.data?.map((category: typeCategory) => ({
          ...category,
          id: category._id,
        }));
        return listCategories;
      } catch (err) {
        throw err;
      }
    },
    {
      keepPreviousData: true,
    }
  );

  if (isLoading) return <Loading />;

  return (
    <Box overflow={"scroll"}>
      <Box display={"flex"} justifyContent={"flex-end"}>
        <Tab />
      </Box>
      {listCategories && (
        <Box mt={8}>
          <DataGridCustom
            rows={listCategories}
            columns={columns}
            hideFooter={true}
            rowHeight={150}
          />
        </Box>
      )}
    </Box>
  );
};

export default CategoriesManagement;

CategoriesManagement.getLayout = function getLayout(page: ReactElement) {
  return (
    <AdminLayout title="Quản lý thư viện" page="Quản lý thư viện">
      {page}
    </AdminLayout>
  );
};
