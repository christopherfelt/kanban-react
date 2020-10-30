import React from "react";
import { Link } from "react-router-dom";
import "./scss/board.scss";

const board = ({ board }) => {
  return (
    <Link
      className="align-self-center"
      to={{ pathname: `/boarddetail/${board.id}` }}
    >
      <div className="">
        <div class="card m-1 board-card">
          <div class="card-body">
            <h4 class="card-title">{board.name}</h4>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default board;
