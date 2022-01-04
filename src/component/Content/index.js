import axios from "axios";
import React, { useEffect, useState } from "react";
import AddInput from "../addInput/AddInput";
import TableList from "../TableList/TableList.js";

const Content = () => {
  const [todoList, setTodoList] = useState([]);
  const [inputData, setInputData] = useState("");
  const [isEdit, setIsEdit] = useState();

  const fetchList = async () => {
    let result = await axios.get("http://localhost:8000/list");
    if (result.status === 200) {
      setTodoList(result.data);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="justify-content-center mx-auto my-auto w-75">
      <div className="card border-0 border-radius-20 my-4">
        <div className="card-body">
          <AddInput
            todoList={todoList}
            setTodoList={setTodoList}
            inputData={inputData}
            setInputData={setInputData}
            isEdit={isEdit}
          />
          <TableList
            todoList={todoList}
            setTodoList={setTodoList}
            setInputData={setInputData}
            setIsEdit={setIsEdit}
          />
        </div>
      </div>
    </div>
  );
};

export default Content;
