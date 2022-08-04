import React, { useEffect, useState } from "react";
import BarChart from "./Types/BarChart";
import LineChart from "./Types/LineChart";
import PieChart from "./Types/PieChart";
import { graphics } from "../../store/data";

const Graphic = ({ cols, rows, updateGraph }) => {
  const [options, setOptions] = useState([]);
  const [firstField, setFirstField] = useState([]);
  const [records, setRecords] = useState([]);
  const [total, setTotal] = useState([]);
  const [currentOption, setCurrentOption] = useState("total");
  const [optionsGraphics, setOptionsGraphics] = useState(graphics);
  const [currentGraphic, setCurrentGraphic] = useState(1);

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

  const getData = () => {
    const values = rows.map((row, index) => {
      let data = [];
      let cont = 100;
      cols.forEach((col) => {
        data.push(
          <td scope="row" key={index + cont++}>
            {row[col.dataField]}
          </td>
        );
      });

      return <tr key={index * cont++}>{data}</tr>;
    });
    return values;
  };

  const data = getData();

  return (
    <div>
      <button
        className="btn btn-primary mt-2 btn-sm"
        onClick={() => updateGraph(false)}
      >
        Regresar
      </button>
      <div id="accordion">
        <div className="card">
          <div className="card-header" id="headingOne">
            <h5 className="mb-0">
              <button
                className="btn btn-link"
                data-toggle="collapse"
                data-target="#collapseOne"
                aria-expanded="false"
                aria-controls="collapseOne"
                type="button"
              >
                Tabla de registros
              </button>
            </h5>
          </div>

          <div
            id="collapseOne"
            className="collapse show"
            aria-labelledby="headingOne"
            data-parent="#accordion"
          >
            <div className="card-body">
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    {cols.map((col, index) => (
                      <th key={index} scope="col">
                        {col.text}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>{data}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
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
            <PieChart title={title} labels={firstField} records={records} />
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
            labels={firstField}
            records={rows}
            cols={options}
          />
        </div>
      )}
    </div>
  );
};

export default Graphic;
