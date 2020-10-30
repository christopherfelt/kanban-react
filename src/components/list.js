import React from "react";

import Task from "./task";
import "./scss/list.scss";

const list = ({ list }) => {
  let tasks = [
    {
      id: 1,
      body: "task information 1",
    },
    {
      id: 2,
      body: "task information 2",
    },
  ];

  return (
    <div className="align-self-center">
      <div class="card m-1 list-card">
        <div class="card-body">
          <h4 class="card-title">{list.name}</h4>
        </div>
        {tasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default list;
