import DataGridCustom from "@/src/components/common/DataGridCustom";
import AdminLayout from "@/src/components/layout/admin";
import { getExportCsv, getListTweets } from "@/src/lib/api";
import { typeCart } from "@/src/lib/types";
import {
  Box,
  Button,
  MenuItem,
  Pagination,
  Select,
  TextField,
  Typography,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import React, { ChangeEvent, ReactElement, useState } from "react";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import Link from "next/link";
import { mkConfig, generateCsv, download, ConfigOptions } from "export-to-csv";

const Comments = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [totalPage, setTotalPage] = useState<number>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalItem, setTotalItem] = useState<number>(0);
  const [status, setStatus] = useState<string>("0");
  const [loading, setLoading] = useState<boolean>(false);

  const { data } = useQuery(
    ["listTweets", currentPage, searchText, status],
    async () => {
      try {
        const res = await getListTweets({
          page: currentPage.toString(),
          searchText,
          status,
        });

        setTotalItem(res?.data?.totalItems);
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
      field: "username",
      headerName: "Username",
      width: 120,
    },
    {
      field: "name",
      headerName: "name",
      width: 150,
    },
    {
      field: "content",
      headerName: "Content",
      width: 400,
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
      field: "action",
      headerName: "Hành động",
      width: 120,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell(param) {
        return (
          <Link href={`/admin/comments/${param.row._id}`} target="_blank">
            <Button variant="outlined" size="small">
              Chi tiết
            </Button>
          </Link>
        );
      },
    },
  ];

  const handlePageChange = (_: ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const generateConfig = (fileName: string) => {
    return mkConfig({
      useKeysAsHeaders: true,
      filename: fileName,
    });
  };

  const exportCsv = async () => {
    setLoading(true);
    let i = 0;
    while (true) {
      i++;
      try {
        const res = await getExportCsv({ page: i.toString() });
        const data = res?.data?.data;
        if (data?.length < 1) break;
        const csv = generateCsv(generateConfig(`dataset-${i}`))(data);
        download(generateConfig(`dataset-${i}`))(csv);
      } catch (error) {
        console.log(error);
      }
    }
    setLoading(false);
  };

  return (
    <Box>
      <Box display={"flex"} justifyContent={"flex-end"} gap={8}>
        <Select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          variant="standard"
          sx={{ width: "25%" }}
        >
          <MenuItem value={"0"}>Đã có bình luận</MenuItem>
          <MenuItem value={"1"}>Chưa bình luận</MenuItem>
        </Select>
        <TextField
          variant="standard"
          placeholder="Tìm kiếm thông tin"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          sx={{ width: "25%" }}
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

      <Box mt={4} display="flex" gap={1} alignItems={"center"}>
        <Typography fontWeight={600}>Tổng số bản ghi: {totalItem}</Typography>
        {loading ? (
          <IconButton>
            <CircularProgress size={20} />
          </IconButton>
        ) : (
          <IconButton onClick={exportCsv}>
            <AssignmentOutlinedIcon color="secondary" />
          </IconButton>
        )}
      </Box>

      <Box mt={2}>
        {data && (
          <DataGridCustom
            disableRowSelectionOnClick
            rows={data}
            columns={columns}
            hideFooter={true}
            rowHeight={150}
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
