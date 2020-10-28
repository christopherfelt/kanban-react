import React, { useContext, useEffect, useState } from "react";
import { BoardContext } from "../context/BoardState";
import Board from "../components/board";
import { useAuth0 } from "@auth0/auth0-react";

const Boards = () => {
  const { isAuthenticated, user } = useAuth0();

  return (
    <div>
      <h1>Boards are live</h1>
    </div>
  );
};

export default Boards;
