import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./scss/board.scss";

const Board = ({ board }) => {
  const initialState = { title: board.title };
  const [title, setTitle] = useState(initialState);
  const [openInput, setOpenInput] = useState(false);

  const editHandler = (e) => {};
  const changeHandler = (e) => {};
  const openInputHandler = (e) => {
    setOpenInput({ input: !openInput });
  };

  console.log(openInput);

  return (
    <div className="align-self-center">
      <div className="card m-1 board-card">
        <div className="card-body">
          <input type="text" className={`${!openInput ? "d-none" : ""}`} />
          <h4
            className={`card-title ${openInput ? "d-none" : ""}`}
            onClick={openInputHandler}
          >
            {board.title}
          </h4>
          <br />
          <Link className="" to={{ pathname: `/boarddetail/${board.id}` }}>
            <h5>Open</h5>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Board;
