import React from "react";
import { Box } from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { selectAppStore, useAppSelector } from "../../../store";
import { blue, green } from "@mui/material/colors";
import { isDarkTheme } from "../../../utils/isDarkTheme";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options: any = {
  plugins: {
    title: {
      display: false,
    },
    legend: {
      reverse: true,
      position: "bottom",
      labels: {
        color:
          window.Telegram?.WebApp.themeParams.text_color || isDarkTheme()
            ? "#ffffff"
            : "#000000",
        font: {
          size: 12,
          weight: "bold",
        },
      },
    },
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
      grid: {
        display: false,
      },
      ticks: {
        padding: 2,
        font: {
          size: 10,
        },
        color: window.Telegram?.WebApp.themeParams.hint_color || "#999999",
      },
    },
    y: {
      stacked: false,
      beginAtZero: true,
      ticks: {
        padding: 2,
        font: {
          size: 10,
        },
        color:
          window.Telegram?.WebApp.themeParams.hint_color || isDarkTheme()
            ? "#999999"
            : "#999999",
      },
      grid: {
        color: isDarkTheme() ? "#393D47" : "#E3E3E8",
      },
    },
  },
};

const limit = 7;

const AppStatsChart = () => {
  const {
    debug: { stats },
  } = useAppSelector(selectAppStore);

  const labels =
    stats?.users.new.history?.slice(0, limit).map((item) => item._id) || [];
  const data = {
    labels,
    datasets: [
      {
        label: "With access to contacts",
        data:
          stats?.users.withContacts.new.history
            ?.slice(0, limit)
            .map((item) => item.count) || [],
        backgroundColor: blue[400],
      },
      {
        label: "New wallet users",
        data:
          stats?.users.new.history?.slice(0, limit).map((item) => item.count) ||
          [],
        backgroundColor: green[400],
      },
    ],
  };

  return (
    <Box>
      <Bar options={options} data={data} />
    </Box>
  );
};

export default AppStatsChart;
