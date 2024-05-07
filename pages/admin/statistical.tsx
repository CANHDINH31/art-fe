import AdminLayout from "@/src/components/layout/admin";
import { Box, Grid, Paper, Stack, Typography } from "@mui/material";
import React, { ReactElement } from "react";
import {
  UserIcon,
  ShoppingCartIcon,
  ChatBubbleBottomCenterIcon,
  PhotoIcon,
  BookmarkSquareIcon,
  Bars3CenterLeftIcon,
} from "@heroicons/react/24/outline";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { faker } from '@faker-js/faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

const Statistical = () => {
  return (
    <Box>
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
      <Line options={options} data={data} />
    </Box>
  );
};

export default Statistical;

Statistical.getLayout = function getLayout(page: ReactElement) {
  return (
    <AdminLayout title="Quản trị viên" page="Thống kê">
      {page}
    </AdminLayout>
  );
};
