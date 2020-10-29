import React, { useContext, useEffect, useState } from "react";
import { BoardContext } from "../context/BoardState";
import Board from "../components/board";
import { useAuth0 } from "@auth0/auth0-react";

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
    <div>
      <h1>Boards are live</h1>
      {boards.map((board) => (
        <Board key={board.id} board={board} />
      ))}
    </div>
  );
};

export default Boards;
