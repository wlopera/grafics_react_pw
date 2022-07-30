import React, { useEffect, useState } from "react";

import { columns, data } from "../../store/data";

const FormData = () => {
  const [cols, setCols] = useState([]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    setCols(columns);
    setRows(data);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Columas:", cols);
  };

  const handlerSetCols = (event) => {
    console.log(1234, JSON.parse(event.target.value));
    //setCols(JSON.parse(event.target.value));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="headers" className="form-label">
          Cabecera de la tabla
        </label>
        <textarea
          className="form-control"
          id="headerArea"
          rows="10"
          value={JSON.stringify(cols, null, 2)}
          onChange={handlerSetCols}
        ></textarea>
      </div>
      <div className="mb-3">
        <label htmlFor="data" className="form-label">
          Datos de la tabla
        </label>
        <textarea
          className="form-control"
          id="dataArea"
          rows="10"
          value={JSON.stringify(rows, null, 2)}
          onChange={() => {}}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Generar
      </button>
    </form>
  );
};

export default FormData;
