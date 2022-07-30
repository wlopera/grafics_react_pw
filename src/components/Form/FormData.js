import React, { useEffect, useState } from "react";

import { columns, records } from "../../store/data";

const FormData = () => {
  const [cols, setCols] = useState([]);
  const [rows, setRows] = useState([]);
  const [header, setHeader] = useState("");
  const [data, setData] = useState("");
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    setCols(columns);
    setRows(records);
    setHeader(JSON.stringify(columns, null, 2));
    setData(JSON.stringify(records, null, 2));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    try {
      setCols(JSON.parse(header));
    } catch (err) {
      setAlert("Json de columnas mal formado: " + err.message);
      console.info("Error columnas:", err);
      return;
    }

    try {
      setCols(JSON.parse(data));
    } catch (err) {
      setAlert("Json de datos mal formado: " + err.message);
      console.info("Error data:", err);
      return;
    }
  };

  const handleSetHeader = (event) => {
    setHeader(event.target.value);
    setAlert(null);
  };

  const handleSetData = (event) => {
    setData(event.target.value);
    setAlert(null);
  };

  return (
    <div>
      {alert && (
        <div class="alert alert-danger" role="alert">
          {alert}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="headers" className="form-label">
            Cabecera de la tabla
          </label>
          <textarea
            className="form-control"
            id="headerArea"
            rows="10"
            value={header}
            onChange={handleSetHeader}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="data" className="form-label">
            Datos de la tabla
          </label>
          <textarea
            className="form-control"
            id="dataArea"
            rows="10"
            value={data}
            onChange={handleSetData}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Generar
        </button>
      </form>
    </div>
  );
};

export default FormData;
