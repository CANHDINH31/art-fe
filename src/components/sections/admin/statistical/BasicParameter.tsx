import React from "react";
import {
  UserIcon,
  ShoppingCartIcon,
  ChatBubbleBottomCenterIcon,
  PhotoIcon,
  BookmarkSquareIcon,
  Bars3CenterLeftIcon,
} from "@heroicons/react/24/outline";
import { Box, Grid, Paper, Stack, Typography } from "@mui/material";

const BasicParameter = () => {
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
                    100
                  </Typography>
                </Box>
              </Stack>
              <UserIcon width={30} />
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
                    100
                  </Typography>
                </Box>
              </Stack>
              <Bars3CenterLeftIcon width={30} />
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
                    100
                  </Typography>
                </Box>
              </Stack>
              <ShoppingCartIcon width={30} />
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
                    100
                  </Typography>
                </Box>
              </Stack>
              <PhotoIcon width={30} />
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
                    100
                  </Typography>
                </Box>
              </Stack>
              <ChatBubbleBottomCenterIcon width={30} />
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
                    100
                  </Typography>
                </Box>
              </Stack>
              <BookmarkSquareIcon width={30} />
            </Box>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default BasicParameter;
