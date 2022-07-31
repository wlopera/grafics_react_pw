import React, { useEffect, useState } from "react";

import Header from "../Header/Header";
import FormData from "../Form/FormData";

import { columns, records } from "../../store/data";
import Graphic from "../Graphic/Graphic";

const Main = () => {
  const [graph, setGraph] = useState(false);
  const [cols, setCols] = useState([]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    setCols(columns);
    setRows(records);
  }, []);

  const handleProcess = (columns, data, isGraph) => {
    setCols(columns);
    setRows(data);
    setGraph(isGraph);
  };

  return (
    <div className="container">
      <Header />
      {graph ? (
        <Graphic cols={cols} rows={rows} updateGraph={setGraph} />
      ) : (
        <FormData cols={cols} rows={rows} onProcess={handleProcess} />
      )}
      <div className="mb-4"></div>
    </div>
  );
};

export default Main;
