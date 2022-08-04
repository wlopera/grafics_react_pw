import React, { useEffect, useState } from "react";
import BarChart from "./Types/BarChart";
import LineChart from "./Types/LineChart";
import PieChart from "./Types/PieChart";
import { graphics } from "../../store/data";

const Graphic = ({ cols, rows, updateGraph }) => {
  const [options, setOptions] = useState([]);
  const [labels, setLabels] = useState([]);
  const [records, setRecords] = useState([]);
  const [total, setTotal] = useState([]);
  const [currentOption, setCurrentOption] = useState("total");
  const [optionsGraphics, setOptionsGraphics] = useState(graphics);
  const [currentGraphic, setCurrentGraphic] = useState(1);
  const [firstField, setFirstField] = useState([]);

  useEffect(() => {
    let registers = [];
    cols.forEach((col, index) => {
      if (index > 0) {
        registers.push({
          key: col.dataField,
          text: col.text,
          value: col.dataField,
        });
      }
    });
    setOptions(registers);
    setLabels(rows.map((row) => row.player));

    setFirstField(
      rows.map((row, index) => {
        return row[cols[0].dataField];
      })
    );

    let data = [];
    rows.forEach((row) => {
      let values = 0;
      registers.forEach((register) => (values += row[register.value]));
      data.push(values);
    });
    setRecords(data);
    setTotal(data);
  }, [cols, rows]);

  const handleOption = (event) => {
    const value = event.target.value;
    setCurrentOption(value);
    if (value === "total") {
      setRecords(total);
    } else {
      setRecords(rows.map((row) => row[value]));
    }
  };

  const handleOptionGraphics = (event) => {
    const value = parseInt(event.target.value);
    setCurrentGraphic(value);
    setCurrentOption("total");
  };

  const title =
    currentOption === "total"
      ? "Totales"
      : options.filter((option) => option.value === currentOption)[0].text;

  return (
    <div>
      <button
        className="btn btn-primary mt-2 btn-sm"
        onClick={() => updateGraph(false)}
      >
        Regresar
      </button>
      <div>
        <select
          className="form-select form-select-sm mb-3 mt-2"
          aria-label=".form-select-sm"
          value={currentGraphic}
          onChange={handleOptionGraphics}
        >
          {optionsGraphics.map((option) => (
            <option key={option.value} value={option.value}>
              {option.text}
            </option>
          ))}
        </select>
      </div>

      {currentGraphic !== 3 && (
        <div>
          <select
            className="form-select form-select-sm mb-3 mt-2"
            aria-label=".form-select-sm"
            value={currentOption}
            onChange={handleOption}
          >
            <option value="total">Totales</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.text}
              </option>
            ))}
          </select>
        </div>
      )}
      {currentGraphic === 1 && (
        <div className="mt-2">
          {options.length > 0 && (
            <PieChart title={title} labels={labels} records={records} />
          )}
        </div>
      )}
      {currentGraphic === 2 && (
        <div className="mt-2">
          <BarChart title={title} labels={firstField} records={records} />
        </div>
      )}
      {currentGraphic === 3 && (
        <div className="mt-2">
          <LineChart
            title="Totales"
            labels={labels}
            records={rows}
            cols={options}
          />
        </div>
      )}
    </div>
  );
};

export default Graphic;
