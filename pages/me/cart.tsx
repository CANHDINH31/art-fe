import DataGridCustom from "@/src/components/common/DataGridCustom";
import MainLayout from "@/src/components/layout/user";
import CardItem from "@/src/components/sections/common/CardItem";
import SettingWP from "@/src/components/sections/wall-painting/SettingWP";
import SidebarWP from "@/src/components/sections/wall-painting/SidebarWP";
import { getDetailUser } from "@/src/lib/api/user";
import { typeCart, typePaint } from "@/src/lib/types";
import { convertCurrency } from "@/src/lib/utils/wall-painting";
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { ReactElement, useEffect } from "react";
import { useSelector } from "react-redux";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/outline";

const Cart = () => {
  const { user } = useSelector((state: any) => state?.user);
  const router = useRouter();

  const columns: GridColDef[] = [
    {
      field: "image",
      headerName: "Tranh",
      width: 150,
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
      disableColumnMenu: true,
      sortable: false,
      renderCell(params) {
        return <span>{params.row?.paint?.title}</span>;
      },
    },
    {
      field: "price",
      headerName: "Giá",
      width: 100,
      disableColumnMenu: true,
      sortable: false,
      renderCell(params) {
        return (
          <Typography color={"error"} fontWeight={600} fontSize={14}>
            {convertCurrency(params.row?.paint?.price)}
          </Typography>
        );
      },
    },
    {
      field: "amount",
      headerName: "Số lượng",
      width: 200,
      disableColumnMenu: true,
      sortable: false,
      renderCell(params) {
        return (
          <ButtonGroup>
            <Button
              size="medium"
              // onClick={() => {
              //   setAmount(Math.max(amount - 1, 1));
              // }}
            >
              <MinusIcon width={12} />
            </Button>
            <Button size="medium">
              <Typography variant="h6">{params.row.amount}</Typography>
            </Button>
            <Button
              size="medium"
              // onClick={() => {
              //   setAmount(amount + 1);
              // }}
            >
              <PlusIcon width={12} />
            </Button>
          </ButtonGroup>
        );
      },
    },
    // {
    //   field: "action",
    //   headerName: "Hành động",
    //   sortable: false,
    //   filterable: false,
    //   width: 200,
    //   renderCell(param) {
    //     return (
    //       <Button
    //         href={`/admin/libraries/categories-management/${param.row._id}`}
    //         variant="outlined"
    //       >
    //         Chi tiết
    //       </Button>
    //     );
    //   },
    // },
  ];

  const { data } = useQuery(
    ["infoUser", user._id],
    async () => {
      const res = await getDetailUser(user._id as string);
      return res.data?.cart?.map((i: typeCart) => ({ id: i._id, ...i }));
    },
    {
      enabled: !!user._id,
    }
  );

  useEffect(() => {
    if (!user) router.push("/");
  }, [user]);

  return (
    <Box py={4}>
      <Container>
        <SettingWP breadcrumb={[`Giỏ hàng (${user?.cart?.length})`]} />
        <Box mt={12}>
          <Grid container spacing={2}>
            <Grid item xs={9}>
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
        </Box>
      </Container>
    </Box>
  );
};

export default Cart;
Cart.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout title="Giỏ hàng">{page}</MainLayout>;
};
