import React from "react";
import List from "../components/list";
import "./scss/boards.scss";

const BoardDetail = () => {
  let lists = [
    {
      id: 1,
      name: "list 1",
    },
    {
      id: 2,
      name: "list 2",
    },
  ];

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
