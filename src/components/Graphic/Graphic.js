import React from "react";
import BarChart from "./Types/BarChart";
import LineChart from "./Types/LineChart";
import PieChart from "./Types/PieChart";

const Graphic = ({ cols, rows, updateGraph }) => {
  return (
    <div>
      <button
        className="btn btn-primary mt-2 btn-sm"
        onClick={() => updateGraph(false)}
      >
        Regresar
      </button>
      <div className="mt-2">
        <PieChart
          title="Campeones de ATP"
          labels={rows.map((row) => row.player)}
          records={rows.map((row) => row.total)}
        />
      </div>
      <div className="mt-2">
        <BarChart
          title="Titulos Ganados"
          labels={rows.map((row) => row.player)}
          records={rows.map((row) => row.total)}
        />
      </div>
      <div className="mt-2">
        <LineChart
          title="Titulos Ganados por Abierto"
          labels={cols.filter((col, index) => {
            if (index > 1) {
              return col.text;
            }
          })}
          records={rows}
        />
      </div>
    </div>
  );
};

export default Graphic;
