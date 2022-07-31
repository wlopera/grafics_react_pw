import React, { useEffect, useState } from "react";

const MyTextArea = ({ label, text, updateText, updateDisabled }) => {
  const [txt, setTxt] = useState();
  const [alert, setAlert] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTxt(JSON.stringify(text, null, 2));
  }, [text]);

  const handleSetTxt = (event) => {
    setTxt(event.target.value);
    setAlert(null);
    setShow(true);
    updateDisabled(true);
  };

  const handleUpdate = () => {
    try {
      const data = JSON.parse(txt);
      updateText(data);
      setShow(false);
      updateDisabled(false);
    } catch (err) {
      setAlert("Json mal formado: " + err.message);
      console.info("Error JSON:", err);
    }
  };

  return (
    <div>
      {alert && (
        <div className="alert alert-danger" role="alert">
          {alert}
        </div>
      )}
      <div className="d-flex justify-content-between bg-success ">
        <div className="mr-auto p-2">
          <label htmlFor="headers" className="form-label text-white h4">
            {label}
          </label>
        </div>
        {show && (
          <div className="p-2">
            <button
              className="btn btn-primary"
              type="button"
              onClick={handleUpdate}
            >
              Actualizar
            </button>
          </div>
        )}
      </div>
      <textarea
        className="form-control"
        id="headerArea"
        rows="10"
        value={txt}
        onChange={handleSetTxt}
      />
    </div>
  );
};

export default MyTextArea;
