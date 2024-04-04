import DataGridCustom from "@/src/components/common/DataGridCustom";
import AdminLayout from "@/src/components/layout/admin";
import { getListOrders, getListTweets } from "@/src/lib/api";
import { typeCart } from "@/src/lib/types";
import { Box, Button, Pagination, TextField } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import React, { ChangeEvent, ReactElement, useState } from "react";
import moment from "moment";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";

const Comments = () => {
  const router = useRouter();

  const [searchText, setSearchText] = useState<string>("");
  const [totalPage, setTotalPage] = useState<number>();
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { data } = useQuery(
    ["listTweets", currentPage, searchText],
    async () => {
      try {
        const res = await getListTweets({
          page: currentPage.toString(),
          searchText,
        });

        setTotalPage(Math.ceil(res.data.totalItems / res.data.itemsPerPage));

        return res?.data?.data?.map((el: typeCart, index: number) => ({
          ...el,
          index: index + 1,
          id: el._id,
        }));
      } catch (err: any) {
        throw err;
      }
    },
    { keepPreviousData: true }
  );

  const columns: GridColDef[] = [
    {
      field: "index",
      headerName: "STT",
      width: 80,
    },
    {
      field: "name",
      headerName: "Name",
      width: 150,
    },
    {
      field: "username",
      headerName: "Username",
      width: 150,
    },
    {
      field: "likes",
      headerName: "Likes",
      width: 100,
    },
    {
      field: "views",
      headerName: "Views",
      width: 100,
    },
    {
      field: "replies",
      headerName: "Reply",
      width: 100,
    },
    {
      field: "retweets",
      headerName: "Retweet",
      width: 100,
    },
    {
      field: "follower",
      headerName: "Follower",
      width: 180,
    },
    {
      field: "following",
      headerName: "Following",
      width: 180,
    },
    {
      field: "action",
      headerName: "Hành động",
      width: 120,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell(param) {
        return (
          <Button
            variant="outlined"
            size="small"
            onClick={() => router.push(`/admin/comments/${param.row._id}`)}
          >
            Chi tiết
          </Button>
        );
      },
    },
  ];

  const handlePageChange = (_: ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  return (
    <Box>
      <Box display={"flex"} justifyContent={"flex-end"} gap={2}>
        <TextField
          variant="standard"
          placeholder="Tìm kiếm thông tin"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          sx={{ width: "30%" }}
        />
        <Button
          variant="outlined"
          size="small"
          color="error"
          onClick={() => {
            setSearchText("");
            setCurrentPage(1);
          }}
          sx={{ width: 100 }}
        >
          <Box display={"flex"} gap={2}>
            <ArrowPathIcon width={16} />
            <span>Clear</span>
          </Box>
        </Button>
      </Box>

      <Box mt={4}>
        {data && (
          <DataGridCustom
            disableRowSelectionOnClick
            rows={data}
            columns={columns}
            hideFooter={true}
            rowHeight={60}
          />
        )}

        {/* Pagination */}
        {Number(totalPage) > 1 && (
          <Box mt={8} display={"flex"} justifyContent={"center"}>
            <Pagination
              count={totalPage}
              color="primary"
              page={currentPage}
              onChange={handlePageChange}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Comments;

Comments.getLayout = function getLayout(page: ReactElement) {
  return (
    <AdminLayout title="Quản trị viên" page="Quản lý comment">
      {page}
    </AdminLayout>
  );
};
