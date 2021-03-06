import axios from "axios";
import React, { useState } from "react";
import "./addInput.css";
const AddInput = (props) => {
  const { setTodoList, inputData, setInputData, isEdit, toast, setIsEdit } =
    props;
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

    if (isEdit) {
      await axios.put(`http://localhost:8000/list/${isEdit}`, body);
    } else {
      await axios.post("http://localhost:8000/list", body);
    }

    if (isEdit) {
      setTodoList((prev) =>
        prev.map((item) => (item.id === isEdit ? { ...body } : item))
      );
      toast.success("Task updated successfully");
      setIsEdit("");
    } else {
      setTodoList((prev) => [...prev, body]);
      toast.success("Task added successfully");
    }

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
            {isEdit ? "Update" : "Add"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddInput;
