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

  const { lists, getLists } = useContext(ListContext);

  useEffect(() => {
    getLists(boardId);
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 d-flex boards-height">
          {lists.map((list) => (
            <List key={list.id} list={list} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BoardDetail;
