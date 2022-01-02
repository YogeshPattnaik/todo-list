import axios from "axios";
import React, { useState } from "react";
import "./addInput.css";
const AddInput = (props) => {
  const { setTodoList } = props;
  const [inputData, setInputData] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setError("");
    setInputData(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputData === "") {
      setError("This is required field*");
    }

    const body = {
      name: inputData,
    };

    await axios.post("http://localhost:8000/list", body);

    setTodoList((prev) => [...prev, body]);

    setInputData("");
  };

  return (
    <form>
      <div className="row mb-4 d-flex">
        <div className="col-8 mb-4 mb-md-0">
          <div className="form-floating">
            <input
              type="text"
              className={error ? "form-control is-invalid" : "form-control"}
              name="taskName"
              placeholder="Add New.."
              value={inputData}
              onChange={(e) => handleInputChange(e)}
            />
            {error && <div className="invalid-feedback d-flex">{error}</div>}
          </div>
        </div>
        <div className="col-4">
          <button
            className="btn btn-primary d-flex"
            type="submit"
            onClick={(e) => handleSubmit(e)}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddInput;
