import React, { useContext, useEffect, useState } from "react";
import { BoardContext } from "../context/BoardState";
import Board from "../components/board";
import { useAuth0 } from "@auth0/auth0-react";
import "./css/boards.css";

const Boards = () => {
  const { isAuthenticated, user } = useAuth0();

  let boards = [
    {
      id: 1,
      name: "board1",
    },
    {
      id: 2,
      name: "board2",
    },
  ];

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 d-flex boards-height">
          {boards.map((board) => (
            <Board key={board.id} board={board} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Boards;
