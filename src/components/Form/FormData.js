import React, { useEffect, useState } from "react";

import MyTextArea from "../UI/MyTextArea";

const FormData = ({ cols, rows, onProcess }) => {
  const [header, setHeader] = useState("");
  const [data, setData] = useState("");
  const [alert, setAlert] = useState(null);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    setHeader(cols);
    setData(rows);
  }, [cols, rows]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onProcess(header, data, true);
  };

  const handleUpdateHeader = (value) => {
    setHeader(value);
    setAlert(null);
  };

  const handleUpdateData = (data) => {
    setData(data);
    setAlert(null);
  };

  return (
    <div>
      {alert && (
        <div className="alert alert-danger" role="alert">
          {alert}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div id="accordion">
          <div className="card">
            <div className="card-header" id="headingOne">
              <h5 className="mb-0">
                <button
                  className="btn btn-link"
                  data-toggle="collapse"
                  data-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                  type="button"
                >
                  Cabecera
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
                <MyTextArea
                  label="Cabecera de la tabla"
                  text={header}
                  updateText={handleUpdateHeader}
                  updateDisabled={setDisabled}
                />
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-header" id="headingTwo">
              <h5 className="mb-0">
                <button
                  className="btn btn-link collapsed"
                  data-toggle="collapse"
                  data-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                  type="button"
                >
                  Datos
                </button>
              </h5>
            </div>
            <div
              id="collapseTwo"
              className="collapse"
              aria-labelledby="headingTwo"
              data-parent="#accordion"
            >
              <div className="card-body">
                <MyTextArea
                  label="Datos de la tabla"
                  text={data}
                  updateText={handleUpdateData}
                  updateDisabled={setDisabled}
                />
              </div>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-primary mt-2 btn-sm"
          disabled={disabled}
        >
          Procesar
        </button>
      </form>
    </div>
  );
};

export default FormData;
