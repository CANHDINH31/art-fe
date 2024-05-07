import DataGridCustom from "@/src/components/common/DataGridCustom";
import MainLayout from "@/src/components/layout/user";
import SettingWP from "@/src/components/sections/wall-painting/SettingWP";
import { getDetailUser, updateUserCart } from "@/src/lib/api/user";
import { typeCart, typePaint } from "@/src/lib/types";
import { convertCurrency } from "@/src/lib/utils/wall-painting";
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Grid,
  IconButton,
  InputLabel,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/outline";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { updateCart } from "@/src/lib/redux/userSlice";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { createOrder } from "@/src/lib/api";

const Cart = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state?.user);
  const router = useRouter();
  const [data, setData] = useState<typeCart[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onSubmit" });

  const columns: GridColDef[] = [
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
      renderCell(params) {
        const handleDecrease = () => {
          const updatedData = data.map((row) => {
            if (row.id === params.row.id) {
              return { ...row, amount: Math.max(row.amount - 1, 1) };
            }
            return row;
          });
          handleUpdateCart(updatedData);
        };

        const handleIncrease = () => {
          const updatedData = data.map((row) => {
            if (row.id === params.row.id) {
              return { ...row, amount: row.amount + 1 };
            }
            return row;
          });
          handleUpdateCart(updatedData);
        };

        return (
          <ButtonGroup>
            <Button size="medium" onClick={handleDecrease}>
              <MinusIcon width={12} />
            </Button>
            <Button size="medium">
              <Typography variant="h6">{params.row.amount}</Typography>
            </Button>
            <Button size="medium" onClick={handleIncrease}>
              <PlusIcon width={12} />
            </Button>
          </ButtonGroup>
        );
      },
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
    {
      field: "action",
      headerName: "Hành động",
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      headerAlign: "center",
      width: 100,
      align: "center",
      renderCell(param) {
        const handleDelete = () => {
          const updatedData = data.filter((row) => row.id !== param.row.id);
          handleUpdateCart(updatedData);
        };
        return (
          <IconButton color="error" size="small" onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        );
      },
    },
  ];

  const { refetch } = useQuery(
    ["infoUser", user?._id],
    async () => {
      const res = await getDetailUser(user._id as string);
      const resData = res.data?.cart?.map((i: typeCart) => ({
        id: i._id,
        ...i,
      }));
      setData(resData);
      return resData;
    },
    {
      enabled: !!user?._id,
    }
  );

  const handleUpdateCart = async (updatedData: typeCart[]) => {
    setData(updatedData);
    dispatch(updateCart(updatedData));
    await updateUserCart({
      listCart: updatedData?.map((i) => ({
        paint: i.paint._id as string,
        amount: i.amount,
      })),
    });
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: createOrder,
    onSuccess: async (res) => {
      dispatch(updateCart([]));
      await updateUserCart({
        listCart: [],
      });
      refetch();
      toast.success("Đặt hàng thành công");
    },
    onError: (error) => {
      toast.error("Đặt hàng thất bại");
    },
  });

  const handleCreateOrder = async (fv: FieldValues) => {
    mutate({
      visit: localStorage?.getItem("visit") as string,
      name: fv?.name,
      phone: fv?.phone,
      address: fv?.address,
      note: fv?.note,
      user: user._id,
      cart: data?.map((e: any) => ({
        paint: e?.paint?._id,
        amount: e?.amount,
      })),
    });
  };

  const totalPrice = () => {
    const totalPrice = data.reduce((a, b) => {
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
        <SettingWP
          breadcrumb={[`Giỏ hàng (${data.length})`]}
          isFilter={false}
        />
        <Box mt={12}>
          {data?.length > 0 ? (
            <Grid container spacing={2}>
              <Grid item xs={12} md={8}>
                {data?.length > 0 && (
                  <DataGridCustom
                    rows={data}
                    columns={columns}
                    hideFooter={true}
                    rowHeight={120}
                  />
                )}
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper>
                  <Box
                    p={4}
                    component={"form"}
                    onSubmit={handleSubmit((data) => handleCreateOrder(data))}
                  >
                    <Typography
                      textAlign={"center"}
                      variant="h3"
                      fontWeight={600}
                    >
                      Thông tin thanh toán chi tiết
                    </Typography>
                    <Box mt={8}>
                      <Box>
                        <InputLabel sx={{ fontSize: 14 }}>
                          Họ tên người nhận *:
                        </InputLabel>
                        <TextField
                          variant="standard"
                          fullWidth
                          size="small"
                          error={errors?.name ? true : false}
                          {...register("name", {
                            required: "Trường này không được để trống",
                          })}
                          helperText={errors?.name?.message?.toString()}
                        />
                      </Box>
                      <Box mt={4}>
                        <InputLabel sx={{ fontSize: 14 }}>
                          Địa chỉ nhận *:
                        </InputLabel>
                        <TextField
                          variant="standard"
                          fullWidth
                          size="small"
                          error={errors?.address ? true : false}
                          {...register("address", {
                            required: "Trường này không được để trống",
                          })}
                          helperText={errors?.address?.message?.toString()}
                        />
                      </Box>
                      <Box mt={4}>
                        <InputLabel sx={{ fontSize: 14 }}>
                          Số điện thoại *:
                        </InputLabel>
                        <TextField
                          variant="standard"
                          fullWidth
                          size="small"
                          error={errors?.phone ? true : false}
                          {...register("phone", {
                            required: "Trường này không được để trống",
                          })}
                          helperText={errors?.phone?.message?.toString()}
                        />
                      </Box>
                      <Box mt={4}>
                        <InputLabel sx={{ fontSize: 14 }}>Ghi chú:</InputLabel>
                        <TextField
                          multiline
                          minRows={4}
                          variant="standard"
                          fullWidth
                          size="small"
                          error={errors?.note ? true : false}
                          {...register("note")}
                          helperText={errors?.note?.message?.toString()}
                        />
                      </Box>
                    </Box>
                    <Box mt={4}>
                      <Typography fontWeight={600}>
                        Tổng số tiền đơn hàng: {convertCurrency(totalPrice())}
                      </Typography>
                      <Typography
                        color={"error"}
                        variant="h6"
                        fontWeight={600}
                        mt={2}
                      >
                        Lưu ý *: Sau khi đặt hàng, đội ngũ hỗ trợ sẽ xác nhận
                        lại với khách hàng trong vòng 30 phút đến 1 ngày
                      </Typography>
                    </Box>
                    <Box mt={4}>
                      <Button
                        variant="contained"
                        fullWidth
                        startIcon={<ShoppingCartIcon />}
                        size="medium"
                        type="submit"
                        disabled={isLoading}
                      >
                        ĐẶT HÀNG
                      </Button>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          ) : (
            <Box
              height={"100%"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Box component={"img"} src={"/img/png/NoData.png"} />
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Cart;
Cart.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout title="Giỏ hàng">{page}</MainLayout>;
};
