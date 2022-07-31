import React from "react";
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

const backgroundColor = [
  "rgba(255, 99, 132, 0.2)",
  "rgba(54, 162, 235, 0.2)",
  "rgba(255, 206, 86, 0.2)",
  "rgba(75, 192, 192, 0.2)",
  "rgba(153, 102, 255, 0.2)",
  "rgba(255, 159, 64, 0.2)",
];

const borderColor = [
  "rgba(255, 99, 132, 1)",
  "rgba(54, 162, 235, 1)",
  "rgba(255, 206, 86, 1)",
  "rgba(75, 192, 192, 1)",
  "rgba(153, 102, 255, 1)",
  "rgba(255, 159, 64, 1)",
];

const LineChart = ({ title, labels, records }) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    height: "400px",
    width: "400px",
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  const getData = () => {
    let result = [];
    records.forEach((record, index) => {
      result.push({
        label: record.player,
        data: [
          record.grandSlamAus,
          record.grandSlamRG,
          record.grandSlamWim,
          record.grandSlamUSA,
        ],
        backgroundColor: backgroundColor[index],
        borderColor: borderColor[index],
      });
    });
    return result;
  };

  const registers = getData();

  const data = {
    labels: labels.map((label) => label.text),
    datasets: registers,
  };

  return (
    <div className="border border-primary">
      <div className="d-flex justify-content-center bg-danger mt-2">
        <h3>{title}</h3>
      </div>
      <div>
        <Line data={data} height="400px" width="400px" options={options} />
      </div>
    </div>
  );
};

export default LineChart;
