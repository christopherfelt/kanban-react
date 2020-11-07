import React, { useContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import { ListContext } from "../context/ListState";
import List from "../components/list";
import "./scss/boards.scss";

const BoardDetail = ({
  match: {
    params: { boardId },
  },
}) => {
  const { isAuthenticated, user } = useAuth0();

  const { lists, getLists, createList } = useContext(ListContext);

  useEffect(() => {
    getLists(boardId);
  }, [user]);

  const newListHandler = (e) => {
    createList({ title: "new list", boardId: boardId });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 d-flex boards-height">
          {lists.map((list) => (
            <List key={list.id} list={list} />
          ))}
          <button
            className="btn btn-primary align-self-center board-card"
            onClick={newListHandler}
          >
            Add List
          </button>
        </div>
      </div>
    </div>
  );
};

export default BoardDetail;
