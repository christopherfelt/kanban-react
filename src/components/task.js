import React, { useContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import { TaskContext } from "../context/TaskState";
import "./scss/task.scss";

const Task = ({ task }) => {
  const [body, setBody] = useState(task.body);
  const [listId, setListId] = useState(task.list_id);
  const [openInput, setOpenInput] = useState(false);
  const { updateTask, deleteTask } = useContext(TaskContext);

  const submitBodyHandler = (e) => {
    e.preventDefault();
    updateTask({ id: task.id, list_id: listId, body: body, move: false });
    openInputHandler();
    task.body = body;
  };

  const submitListIdHandler = (e) => {
    e.preventDefault();
    updateTask({
      id: task.id,
      oldTaskList: task.list_id,
      list_id: listId,
      body: body,
      move: true,
    });
    openInputHandler();
  };

  const deleteHandler = (e) => {
    deleteTask({ id: task.id, list_id: task.list_id });
  };

  const changeBodyHandler = (e) => {
    setBody(e.target.value);
  };

  const changeListHandler = (e) => {
    setListId(e.target.value);
  };

  const openInputHandler = (e) => {
    setOpenInput(!openInput);
  };

  return (
    <div className="task border text-center">
      <h6 onClick={openInputHandler}>{task.body}</h6>
      <h6>{task.id}</h6>
      <div className={`${!openInput ? "d-none" : ""}`}>
        <form onSubmit={submitBodyHandler}>
          <label htmlFor="body">Body: </label>
          <input
            name="body"
            type="text"
            value={body}
            onChange={changeBodyHandler}
          />
        </form>
        <form onSubmit={submitListIdHandler}>
          <label htmlFor="listChange">List</label>
          <input type="text" value={listId} onChange={changeListHandler} />
        </form>
        <button className="btn btn-danger">X</button>
      </div>
    </div>
  );
};

export default Task;
