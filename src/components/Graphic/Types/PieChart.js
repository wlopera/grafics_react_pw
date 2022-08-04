import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import randomColor from "randomcolor";

const PieChart = ({ title, labels, records }) => {
  ChartJS.register(ArcElement, Tooltip, Legend);

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
        label: "",
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
        <Doughnut
          data={data}
          height="400px"
          width="400px"
          options={{
            maintainAspectRatio: false,
          }}
        />
      </div>
    </div>
  );
};

export default PieChart;
