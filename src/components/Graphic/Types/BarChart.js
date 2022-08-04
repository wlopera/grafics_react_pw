import React from "react";
import { Chart as ChartJS, registerables } from "chart.js";
import randomColor from "randomcolor";

import { Bar } from "react-chartjs-2";

const BarChart = ({ title, labels, records }) => {
  ChartJS.register(...registerables);

  let backgroundColors = [];
  let borderColors = [];

  for (let index = 0; index < records.length; index++) {
    backgroundColors.push(randomColor());
    borderColors.push(randomColor());
  }

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Campeonatos ganados",
        data: records,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
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
