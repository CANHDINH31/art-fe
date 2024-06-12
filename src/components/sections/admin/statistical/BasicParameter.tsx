import React, { useEffect, useState } from "react";
import {
  UserIcon,
  ShoppingCartIcon,
  ChatBubbleBottomCenterIcon,
  PhotoIcon,
  BookmarkSquareIcon,
  Bars3CenterLeftIcon,
} from "@heroicons/react/24/solid";
import { Box, Grid, Paper, Stack, Typography } from "@mui/material";
import { getBasicParamerter } from "@/src/lib/api/statistical";

const BasicParameter = () => {
  const [parameter, setParanmeter] = useState<any>({});
  useEffect(() => {
    const getData = async () => {
      const res = await getBasicParamerter();
      setParanmeter(res.data);
    };
    getData();
  }, []);

  return (
    <Grid container spacing={4}>
      <Grid item xs={4}>
        <Paper elevation={3}>
          <Box p={2}>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Stack gap={1}>
                <Typography variant="h4" fontWeight={600}>
                  Tổng số tài khoản
                </Typography>
                <Box>
                  <Typography variant="h4" fontWeight={500}>
                    {parameter?.account}
                  </Typography>
                </Box>
              </Stack>
              <Box
                p={2}
                bgcolor={"#4FD1C5"}
                borderRadius={2}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <UserIcon width={30} color="#fff" />
              </Box>
            </Box>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper elevation={3}>
          <Box p={2}>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Stack gap={1}>
                <Typography variant="h4" fontWeight={600}>
                  Tổng số lượt truy cập
                </Typography>
                <Box>
                  <Typography variant="h4" fontWeight={500}>
                    {parameter?.access}
                  </Typography>
                </Box>
              </Stack>
              <Box
                p={2}
                bgcolor={"#4FD1C5"}
                borderRadius={2}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Bars3CenterLeftIcon width={30} color="white" />
              </Box>
            </Box>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper elevation={3}>
          <Box p={2}>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Stack gap={1}>
                <Typography variant="h4" fontWeight={600}>
                  Tổng số đơn hàng
                </Typography>
                <Box>
                  <Typography variant="h4" fontWeight={500}>
                    {parameter?.order}
                  </Typography>
                </Box>
              </Stack>
              <Box
                p={2}
                bgcolor={"#4FD1C5"}
                borderRadius={2}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <ShoppingCartIcon width={30} color="#fff" />
              </Box>
            </Box>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper elevation={3}>
          <Box p={2}>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Stack gap={1}>
                <Typography variant="h4" fontWeight={600}>
                  Tổng số tranh
                </Typography>
                <Box>
                  <Typography variant="h4" fontWeight={500}>
                    {parameter?.paint}
                  </Typography>
                </Box>
              </Stack>
              <Box
                p={2}
                bgcolor={"#4FD1C5"}
                borderRadius={2}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <PhotoIcon width={30} color="#fff" />
              </Box>
            </Box>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper elevation={3}>
          <Box p={2}>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Stack gap={1}>
                <Typography variant="h4" fontWeight={600}>
                  Tổng số bình luận
                </Typography>
                <Box>
                  <Typography variant="h4" fontWeight={500}>
                    {parameter?.comment}
                  </Typography>
                </Box>
              </Stack>
              <Box
                p={2}
                bgcolor={"#4FD1C5"}
                borderRadius={2}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <ChatBubbleBottomCenterIcon width={30} color="#fff" />
              </Box>
            </Box>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper elevation={3}>
          <Box p={2}>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Stack gap={1}>
                <Typography variant="h4" fontWeight={600}>
                  Tổng số lượt đánh giá
                </Typography>
                <Box>
                  <Typography variant="h4" fontWeight={500}>
                    {parameter?.rate}
                  </Typography>
                </Box>
              </Stack>
              <Box
                p={2}
                bgcolor={"#4FD1C5"}
                borderRadius={2}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <BookmarkSquareIcon width={30} color="#fff" />
              </Box>
            </Box>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default BasicParameter;
