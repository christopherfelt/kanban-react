import React from "react";

import "./scss/task.scss";

const task = ({ task }) => {
  return (
    <div className="task">
      <h6>{task.body}</h6>
    </div>
  );
};

export default task;
