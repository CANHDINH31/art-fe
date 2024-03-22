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
  Typography,
} from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/outline";
import DeleteIcon from "@mui/icons-material/Delete";
import { updateCart } from "@/src/lib/redux/userSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state?.user);
  const router = useRouter();
  const [data, setData] = useState<typeCart[]>([]);

  useQuery(
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
        return <span>{params.row?.paint?.title}</span>;
      },
    },
    {
      field: "price",
      headerName: "Giá",
      width: 150,
      disableColumnMenu: true,
      headerAlign: "center",
      align: "center",
      sortable: false,
      renderCell(params) {
        return (
          <Typography fontWeight={600} fontSize={14}>
            {convertCurrency(params.row?.paint?.price)}
          </Typography>
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
              <Grid item xs={12} md={9}>
                {data?.length > 0 && (
                  <DataGridCustom
                    rows={data}
                    columns={columns}
                    hideFooter={true}
                    rowHeight={120}
                  />
                )}
              </Grid>
              <Grid item xs={3}></Grid>
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
