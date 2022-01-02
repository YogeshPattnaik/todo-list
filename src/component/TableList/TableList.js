import axios from "axios";
import React from "react";

const TableList = (props) => {
  const { todoList, setTodoList } = props;

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:8000/list/${id}`);
    setTodoList(todoList.filter((item) => item.id !== id));
  };

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>S.No.</th>
          <th>Name</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {todoList.length === 0 ? (
          <tr>
            <td></td>
            <td>No Data Found</td>
            <td></td>
          </tr>
        ) : (
          todoList.map((list, i) => {
            const { name, id } = list;
            const sNo = i + 1;
            return (
              <tr key={i}>
                <td>{sNo}</td>
                <td>{name}</td>
                <td>
                  <i
                    className="fa fa-trash-o"
                    style={{ fontSize: 36, color: "red", cursor: "pointer" }}
                    onClick={() => deleteTask(id)}
                  ></i>
                </td>
              </tr>
            );
          })
        )}
      </tbody>
    </table>
  );
};

export default TableList;
