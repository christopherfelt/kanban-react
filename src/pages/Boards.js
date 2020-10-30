import React, { useContext, useEffect, useState } from "react";
import { BoardContext } from "../context/BoardState";
import Board from "../components/board";
import { useAuth0 } from "@auth0/auth0-react";
import "./scss/boards.scss";

const Boards = () => {
  const { isAuthenticated, user } = useAuth0();

  const { boards, getBoards } = useContext(BoardContext);

  useEffect(() => {
    getBoards();
  }, []);

  // let boards = [
  //   {
  //     id: 1,
  //     name: "board1",
  //   },
  //   {
  //     id: 2,
  //     name: "board2",
  //   },
  // ];

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 d-flex boards-height">
          {boards.map((board) => (
            <Board key={board.id} board={board} />
          ))}
          <button className="btn btn-primary align-self-center board-card">
            Add Board
          </button>
        </div>
      </div>
    </div>
  );
};

export default Boards;
