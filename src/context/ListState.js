import React, { createContext, useReducer } from "react";
import ListReducer from "./reducers/ListReducer";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

const initialState = {
  list: {},
  lists: [],
  error: null,
  loadingAllLists: true,
  loadingNewList: false,
};

export const ListContext = createContext(initialState);

export const ListProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ListReducer, initialState);

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

  async function getLists(boardId) {
    try {
      if (isAuthenticated) {
        const options = await getRequestData(
          "get",
          "boards/" + boardId + "/lists"
        );
        let res = await axios(options);
        dispatch({
          type: "GET_LISTS",
          payload: res.data,
        });
      }
    } catch (error) {
      dispatch({
        type: "LIST_ERROR",
        payload: error,
      });
    }
  }

  // async function getList(listId) {
  //   try {
  //     // let res = await api.get("lists/" + listId);
  //     dispatch({
  //       type: "GET_LIST",
  //       // payload: res.data,
  //     });
  //   } catch (error) {
  //     dispatch({
  //       type: "LIST_ERROR",
  //       payload: error,
  //     });
  //   }
  // }

  async function createList(listData) {
    try {
      if (isAuthenticated) {
        dispatch({
          type: "POST_LOAD",
        });
        const options = await getRequestData(
          "post",
          "boards/" + listData.boardId + "/lists",
          listData
        );
        let res = await axios(options);
        dispatch({
          type: "POST_LIST",
          payload: res.data,
        });
      } else {
        console.log("You are not authorized to make this request");
      }
    } catch (error) {
      dispatch({
        type: "LIST_ERROR",
        payload: error,
      });
    }
  }

  async function updateList(listData) {
    try {
      if (isAuthenticated) {
        const options = await getRequestData(
          "put",
          "boards/" + listData.boardId + "/lists/" + listData.id,
          listData
        );
        let res = await axios(options);
        dispatch({
          type: "PUT_LIST",
          payload: res.data,
        });
      } else {
        console.log("You are not authorized to make this request");
      }
    } catch (error) {
      dispatch({
        type: "LIST_ERROR",
        payload: error,
      });
    }
  }

  async function deleteList(listData) {
    try {
      if (isAuthenticated) {
        dispatch({
          type: "DELETE_LIST",
          payload: listData.id,
        });
        const options = await getRequestData(
          "delete",
          "boards/" + listData.boardId + "/lists/" + listData.id,
          {}
        );
        await axios(options);
      } else {
        console.log("You are not authorized to make this request");
      }
    } catch (error) {
      dispatch({
        type: "LIST_ERROR",
        payload: error,
      });
    }
  }

  return (
    <ListContext.Provider
      value={{
        list: state.list,
        lists: state.lists,
        error: state.error,
        loading: state.loading,
        getLists,
        createList,
        updateList,
        deleteList,
      }}
    >
      {children}
    </ListContext.Provider>
  );
};
