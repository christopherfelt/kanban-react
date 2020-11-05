import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import { BoardContext } from "../context/BoardState";
import "./scss/board.scss";

const Board = ({ board }) => {
  const initialState = { title: board.title };
  const [title, setTitle] = useState(board.title);
  const [openInput, setOpenInput] = useState(false);
  const { updateBoard, deleteBoard } = useContext(BoardContext);

  useEffect(() => {
    console.log("board has been updated");
  }, [board]);

  const submitHandler = (e) => {
    e.preventDefault();
    updateBoard({ id: board.id, description: board.description, title: title });
    openInputHandler();
    board.title = title;
  };
  const changeHandler = (e) => {
    setTitle(e.target.value);
  };
  const deleteHandler = (e) => {
    deleteBoard(board.id);
  };
  const openInputHandler = (e) => {
    setOpenInput(!openInput);
  };

  return (
    <div className="align-self-center">
      <div className="card m-1 board-card">
        <h1>{board.id}</h1>
        <div className="card-body">
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
            {board.title}
          </h4>
          <br />
          <Link className="" to={{ pathname: `/boarddetail/${board.id}` }}>
            <h5>Open</h5>
          </Link>
          <button className="btn btn-danger" onClick={deleteHandler}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Board;
