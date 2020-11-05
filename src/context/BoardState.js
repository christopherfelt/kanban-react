import React, { createContext, useReducer } from "react";
import BoardReducer from "./reducers/BoardReducer";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

const initialState = {
  board: {},
  boards: [],
  error: null,
  loadingAllBoards: true,
  loadingNewBoard: false,
};

export const BoardContext = createContext(initialState);

export const BoardProvider = ({ children }) => {
  const [state, dispatch] = useReducer(BoardReducer, initialState);

  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  async function getRequestData(requestType, requestPath, data) {
    let url = "http://127.0.0.1:8000/api/v1/" + requestPath;

    const token = await getAccessTokenSilently();

    const options = {
      method: requestType,
      url: url,
      headers: {
        Authorization: "Bearer " + token,
        "Content-type": "application/json",
      },
    };

    if (data != null) {
      options.data = data;
    }

    return options;
  }

  async function getBoards() {
    try {
      if (isAuthenticated) {
        const options = await getRequestData("get", "", {});
        let res = await axios(options);
        dispatch({
          type: "GET_BOARDS",
          payload: res.data,
        });
      }
    } catch (error) {
      dispatch({
        type: "BOARD_ERROR",
        payload: error,
      });
    }
  }

  // async function getBoard(boardId) {
  //   try {
  //     let res = await api.get("boards/" + boardId);
  //     dispatch({
  //       type: "GET_BOARD",
  //       payload: res.data,
  //     });
  //   } catch (error) {
  //     dispatch({
  //       type: "BOARD_ERROR",
  //       payload: error,
  //     });
  //   }
  // }

  async function createBoard(boardData) {
    try {
      if (isAuthenticated) {
        dispatch({
          type: "POST_LOAD",
        });
        const options = await getRequestData("post", "", boardData);
        let res = await axios(options);
        dispatch({
          type: "POST_BOARD",
          payload: res.data,
        });
      } else {
        console.log("You are not authenticated to make this request");
      }
    } catch (error) {
      dispatch({
        type: "BOARD_ERROR",
        payload: error,
      });
    }
  }

  async function updateBoard(boardData) {
    try {
      if (isAuthenticated) {
        const options = await getRequestData("put", boardData.id, boardData);
        let res = await axios(options);
        dispatch({
          type: "PUT_BOARD",
          payload: res.data,
        });
      } else {
        console.log("You are not authenticated to make this request");
      }
    } catch (error) {
      dispatch({
        type: "BOARD_ERROR",
        payload: error,
      });
    }
  }

  async function deleteBoard(boardId) {
    try {
      if (isAuthenticated) {
        dispatch({
          type: "DELETE_BOARD",
          payload: boardId,
        });
        const options = await getRequestData("delete", boardId, {});
        await axios(options);
      } else {
        console.log("You are not authenticated and cannot make this request");
      }
    } catch (error) {
      dispatch({
        type: "BOARD_ERROR",
        payload: error,
      });
    }
  }

  return (
    <BoardContext.Provider
      value={{
        board: state.board,
        boards: state.boards,
        error: state.error,
        loadingAllBoards: state.loadingAllBoards,
        loadingNewBoard: state.loadingNewBoard,
        getBoards,
        // getBoard,
        createBoard,
        updateBoard,
        deleteBoard,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};
