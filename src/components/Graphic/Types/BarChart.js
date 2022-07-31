import React from "react";
import { Chart as ChartJS, registerables } from "chart.js";

import { Bar } from "react-chartjs-2";

const BarChart = ({ title, labels, records }) => {
  ChartJS.register(...registerables);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Campeonatos ganados",
        data: records,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="border border-primary">
      <div className="d-flex justify-content-center bg-danger mt-2">
        <h3>{title}</h3>
      </div>
      <div>
        <Bar
          data={data}
          height="400px"
          width="400px"
          options={{
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false,
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default BarChart;
