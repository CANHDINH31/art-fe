import React from "react";
import { Line } from "react-chartjs-2";
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
    title: {
      text: "Biểu đồ đường thống kê đơn hàng",
      display: true,
    },
    legend: {
      position: "top" as const,
    },
  },
};

const labels = [
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
  "January",
  "February",
  "March",
  "April",
  "May",
];

const data = {
  labels,
  datasets: [
    {
      label: "Đơn hàng",
      data: [0, 0, 0, 1, 0, 0, 2, 3, 1, 0, 2, 5],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};

const OrderParameter = () => {
  return <Line options={options} data={data} />;
};

export default OrderParameter;
