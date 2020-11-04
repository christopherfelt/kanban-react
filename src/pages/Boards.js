import React, { useContext, useEffect, useState } from "react";
import { BoardContext } from "../context/BoardState";
import Board from "../components/board";
import { useAuth0 } from "@auth0/auth0-react";
import "./scss/boards.scss";

const Boards = () => {
  const { isAuthenticated, user } = useAuth0();

  const initialState = {
    title: "",
  };

  const { boards, getBoards, createBoard } = useContext(BoardContext);
  const [allValues, setAllValues] = useState(initialState);

  useEffect(() => {
    getBoards();
    console.log("boards use effect");
  }, [user]);
  // ^ empty array keeps useEffect from hitting getTasks a bagillion times
  // I put user in the dependency so that when auth0 completes its load the use effect hits again

  const newBoardHandler = (e) => {
    createBoard({ title: "New Board", description: "This is a new board" });
  };

  const changeHandler = (e) => {
    setAllValues({ ...allValues, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 d-flex boards-height">
          {boards.map((board) => (
            <Board key={board.id} board={board} />
          ))}
          <button
            className="btn btn-primary align-self-center board-card"
            onClick={newBoardHandler}
          >
            Add Board
          </button>
        </div>
      </div>
    </div>
  );
};

export default Boards;
