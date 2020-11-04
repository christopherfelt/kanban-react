import React, { createContext, useReducer } from "react";
import BoardReducer from "./reducers/BoardReducer";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

const initialState = {
  board: {},
  boards: [],
  error: null,
  loading: true,
};

// let api = axios.create({
//   baseURL: "http://127.0.0.1:8000/api/v1/",
//   headers: {
//     "Content-type": "application/json",
//   },
// });

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
        console.log("board state get");
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
        const options = await getRequestData("post", "", boardData);
        console.log(options);
        let res = await axios(options);

        getBoards();
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
        const token = await getAccessTokenSilently();
        console.log("token: ", token);
        const options = {
          method: "put",
          url:
            "http://127.0.0.1:8000/api/boards/" +
            boardData.id +
            "/updateordelete",
          data: boardData,
          headers: {
            Authorization: "Bearer " + token,
            "Content-type": "application/json",
          },
        };
        await axios(options);
        // getBoard(boardData.id);
        // getBoards();
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
        const token = await getAccessTokenSilently();
        const options = {
          method: "delete",
          url:
            "http://127.0.0.1:8000/api/boards/" + boardId + "/updateordelete",
          data: boardId,
          headers: {
            Authorization: "Bearer " + token,
            "Content-type": "application/json",
          },
        };
        await axios(options);
        getBoards();
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

  return (
    <BoardContext.Provider
      value={{
        board: state.board,
        boards: state.boards,
        error: state.error,
        loading: state.loading,
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
