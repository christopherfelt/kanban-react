import React, { useContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import { TaskContext } from "../context/TaskState";
import Task from "./task";
import "./scss/list.scss";

const List = ({ list }) => {
  const { isAuthenticated, user } = useAuth0();

  const { tasks, getTasks } = useContext(TaskContext);

  useEffect(() => {
    getTasks(list.id);
  }, []);
  // ^ empty array keeps useEffect from hitting getTasks a bagillion times

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

  return (
    <div className="align-self-center">
      <div className="card m-1 list-card">
        <div className="card-body">
          <h4 className="card-title">{list.title}</h4>
        </div>
        {currentTasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default List;
