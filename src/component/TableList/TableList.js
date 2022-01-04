import axios from "axios";
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

const TableList = (props) => {
  const { todoList, setTodoList, setInputData, setIsEdit, toast } = props;
  const [showModal, setShowModal] = useState("");

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:8000/list/${id}`);
    setTodoList(todoList.filter((item) => item.id !== id));
    setShowModal("");
    toast.success("Task deleted SuccessFully");
  };

  const editTask = (id) => {
    const editItem = todoList.find((item) => item.id === id);
    setInputData(editItem.name);
    setIsEdit(id);
  };

  return (
    <>
      <Modal show={showModal}>
        <Modal.Header>
          <Modal.Title>Delete Task</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>{`Are you sure to delete ${showModal.name}`}</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal("")}>
            Close
          </Button>
          <Button variant="danger" onClick={() => deleteTask(showModal.id)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
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
                      className="fa fa-edit"
                      style={{
                        fontSize: 36,
                        color: "green",
                        cursor: "pointer",
                        marginRight: 4,
                      }}
                      onClick={() => editTask(id)}
                    ></i>
                    <i
                      className="fa fa-trash-o"
                      style={{ fontSize: 36, color: "red", cursor: "pointer" }}
                      onClick={() => setShowModal(list)}
                    ></i>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </>
  );
};

export default TableList;
