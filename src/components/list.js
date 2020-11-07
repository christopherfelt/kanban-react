import React, { useContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import { TaskContext } from "../context/TaskState";
import { ListContext } from "../context/ListState";
import Task from "./task";
import "./scss/list.scss";

const List = ({ list }) => {
  const { isAuthenticated, user } = useAuth0();
  const [title, setTitle] = useState(list.title);
  const [openInput, setOpenInput] = useState(false);
  const { tasks, getTasks, createTask } = useContext(TaskContext);
  const { updateList, deleteList } = useContext(ListContext);

  useEffect(() => {
    getTasks(list.id);
  }, []);
  // ^ empty array keeps useEffect from hitting getTasks a bagillion times

  const submitHandler = (e) => {
    e.preventDefault();
    updateList({ id: list.id, boardId: list.board_id, title: title });
    openInputHandler();
    list.title = title;
  };

  const changeHandler = (e) => {
    setTitle(e.target.value);
  };

  const deleteHandler = (e) => {
    deleteList({ id: list.id, boardId: list.board_id });
  };

  const openInputHandler = (e) => {
    setOpenInput(!openInput);
  };

  const getCurrentTasks = (tasks, listId) => {
    let currentTasks = [];
    for (let t = 0; t < tasks.length; t++) {
      let listObj = tasks[t];
      if (Object.keys(listObj)[0] == list.id) {
        currentTasks = listObj[Object.keys(listObj)];
      }
    }
    return currentTasks;
  };

  let currentTasks = getCurrentTasks(tasks, list.id);

  const newTaskHandler = (e) => {
    createTask({ body: "new task", listId: list.id });
    console.log("listid: " + list.id);
  };

  return (
    <div className="align-self-center">
      <div className="card m-1 list-card">
        <div className="card-body">
          <h1>{list.id}</h1>
          <form onSubmit={submitHandler}>
            <input
              type="text"
              className={`${!openInput ? "d-none" : ""}`}
              value={title}
              onChange={changeHandler}
            />
          </form>
          <h4
            className={`card-title ${openInput ? "d-none" : ""}`}
            onClick={openInputHandler}
          >
            {list.title}
          </h4>
          <button className="btn btn-danger" onClick={deleteHandler}>
            Delete
          </button>

          {currentTasks.map((task) => (
            <Task key={task.id} task={task} />
          ))}
          <button className="btn btn-primary" onClick={newTaskHandler}>
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default List;
