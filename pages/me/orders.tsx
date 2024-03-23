import DataGridCustom from "@/src/components/common/DataGridCustom";
import { getListOrders } from "@/src/lib/api";
import { typeCart } from "@/src/lib/types";
import {
  Box,
  Button,
  Container,
  Grid,
  Pagination,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import React, { ChangeEvent, ReactElement, useEffect, useState } from "react";
import moment from "moment";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import ModalCustom from "@/src/components/common/Modal";
import { convertCurrency } from "@/src/lib/utils/wall-painting";
import MainLayout from "@/src/components/layout/user";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const Orders = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [totalPage, setTotalPage] = useState<number>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [detailOrder, setDetailOrder] = useState<any>("");
  const { user } = useSelector((state: any) => state?.user);
  const router = useRouter();

  const { data } = useQuery(
    ["listOrders", currentPage, searchText, user?._id],
    async () => {
      try {
        const res = await getListOrders({
          page: currentPage.toString(),
          searchText,
          userId: user?._id,
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
      headerName: "Tên người nhận",
      width: 200,
    },
    {
      field: "address",
      headerName: "Địa chỉ người nhận",
      width: 200,
    },
    {
      field: "phone",
      headerName: "Số điện thoại",
      width: 150,
    },
    { field: "note", headerName: "Ghi chú", width: 200 },
    {
      field: "created_at",
      headerName: "Thời gian đặt",
      width: 200,
      renderCell(param) {
        return (
          <span>
            {moment(param.row.createdAt).format("DD-MM-YYYY HH:mm:ss")}
          </span>
        );
      },
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
            onClick={() => {
              setIsOpen(true);
              setDetailOrder(param.row);
            }}
          >
            Chi tiết
          </Button>
        );
      },
    },
  ];

  const columnsDetail: GridColDef[] = [
    {
      field: "image",
      headerName: "Tranh",
      width: 150,
      headerAlign: "center",
      align: "center",
      disableColumnMenu: true,
      sortable: false,
      renderCell(params) {
        return (
          <Box
            component={"img"}
            src={params.row?.paint?.url}
            sx={{
              width: 100,
              height: 100,
              objectFit: "cover",
              borderRadius: 2,
            }}
          />
        );
      },
    },
    {
      field: "title",
      headerName: "Tên tác phẩm",
      width: 150,
      headerAlign: "center",
      align: "center",
      disableColumnMenu: true,
      sortable: false,
      renderCell(params) {
        return (
          <Stack gap={1} justifyContent={"center"} alignItems={"center"}>
            <div>{params.row?.paint?.title}</div>
            <Typography fontWeight={600} fontSize={14}>
              {convertCurrency(params.row?.paint?.price)}
            </Typography>
          </Stack>
        );
      },
    },
    {
      field: "amount",
      headerName: "Số lượng",
      width: 150,
      disableColumnMenu: true,
      sortable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "total",
      headerName: "Thành tiền",
      width: 150,
      align: "center",
      headerAlign: "center",
      disableColumnMenu: true,
      sortable: false,
      renderCell(params) {
        return (
          <Typography fontWeight={600} fontSize={14}>
            {convertCurrency(params.row?.paint?.price * params.row.amount)}
          </Typography>
        );
      },
    },
  ];

  const handlePageChange = (_: ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const totalPrice = () => {
    const totalPrice = detailOrder?.cart?.reduce((a: any, b: any) => {
      return a + b.paint?.price * b.amount;
    }, 0);
    return totalPrice;
  };

  useEffect(() => {
    if (!user) router.push("/");
  }, [user]);

  return (
    <Box py={4} minHeight={"60vh"}>
      <Container>
        <Box>
          <Box
            display={"flex"}
            gap={2}
            flexDirection={{ xs: "column", md: "row" }}
            justifyContent={{ md: "flex-end" }}
            alignItems={{ md: "unset", xs: "flex-end" }}
          >
            <TextField
              variant="standard"
              placeholder="Tìm kiếm thông tin"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              sx={{ width: { md: "30%", xs: "100%" } }}
            />
            <Button
              variant="outlined"
              size="small"
              color="error"
              onClick={() => {
                setSearchText("");
                setCurrentPage(1);
              }}
              sx={{ width: { md: 100, xs: "50%" } }}
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

          {/* Modal Detail */}
          <ModalCustom
            open={isOpen}
            handleClose={() => setIsOpen(false)}
            style={{ width: { xs: "90%", md: "unset" } }}
          >
            <Box>
              <Typography fontWeight={600} variant="h3">
                Thông tin chi tiết
              </Typography>
              <Box mt={4}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h5">
                      Họ và tên: {detailOrder?.name}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h5">
                      Địa chỉ: {detailOrder?.address}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h5">
                      Số điện thoại: {detailOrder?.phone}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h5">
                      Ghi chú:{" "}
                      {detailOrder?.note
                        ? detailOrder?.note
                        : "Không có ghi chú"}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h5" fontWeight={600}>
                      Tổng tiền: {convertCurrency(totalPrice())}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
              <Box mt={4}>
                {detailOrder?.cart && (
                  <DataGridCustom
                    disableRowSelectionOnClick
                    rows={detailOrder?.cart?.map((e: any) => ({
                      ...e,
                      id: e._id,
                    }))}
                    columns={columnsDetail}
                    hideFooter={true}
                    rowHeight={120}
                  />
                )}
              </Box>
            </Box>
          </ModalCustom>
        </Box>
      </Container>
    </Box>
  );
};

export default Orders;

Orders.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout title="Quản lý đơn hàng">{page}</MainLayout>;
};
