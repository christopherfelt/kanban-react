import React from "react";
import "./css/list.css";

const list = ({ list }) => {
  return (
    <div className="align-self-center">
      <div class="card m-1 list-card">
        <div class="card-body">
          <h4 class="card-title">{list.name}</h4>
        </div>
      </div>
    </div>
  );
};

export default list;
