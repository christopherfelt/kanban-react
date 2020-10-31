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
        <div className="card m-1 board-card">
          <div className="card-body">
            <h4 className="card-title">{board.title}</h4>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default board;
