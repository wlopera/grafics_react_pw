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
import randomColor from "randomcolor";

const LineChart = ({ title, labels, records, cols }) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  let backgroundColors = [];
  let borderColors = [];

  for (let index = 0; index < records.length; index++) {
    backgroundColors.push(randomColor());
    borderColors.push(randomColor());
  }

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

  const fields = cols.map((col) => col.value);

  const getData = () => {
    let result = [];
    records.forEach((record, index) => {
      let data = [];
      fields.forEach((field) => {
        data.push(record[field]);
      });
      result.push({
        label: labels[index],
        data: data,
        backgroundColor: backgroundColors[index],
        borderColor: borderColors[index],
      });
    });
    return result;
  };

  const registers = getData();

  const data = {
    labels: cols.map((label) => label.text),
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
