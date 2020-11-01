import React, { createContext, useReducer } from "react";
import ListReducer from "./reducers/ListReducer";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

const initialState = {
  list: {},
  lists: [],
  error: null,
  loading: true,
};

let api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1/",
  headers: {
    "Content-type": "application/json",
  },
});

export const ListContext = createContext(initialState);

export const ListProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ListReducer, initialState);

  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  async function getRequestData(
    requestType,
    requestPath,
    data,
    addPath = false
  ) {
    let url = "http://127.0.0.1:8000/api/v1/" + requestPath;

    // if ((requestType === "get" || requestType === "post") && !addPath) {
    //   url = "http://127.0.0.1:8000/api/v1/" + requestPath;
    // } else {
    //   url = "http://127.0.0.1:8000/api/v1/" + requestPath + "/" + data.id;
    // }

    const token = await getAccessTokenSilently();

    const options = {
      method: requestType,
      url: url,
      headers: {
        Authorization: "Bearer " + token,
        "Content-type": "application/json",
      },
    };

    return options;
  }

  async function getLists(boardId) {
    try {
      if (isAuthenticated) {
        let data = { id: boardId };
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

  async function getList(listId) {
    try {
      let res = await api.get("lists/" + listId);
      dispatch({
        type: "GET_LIST",
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: "LIST_ERROR",
        payload: error,
      });
    }
  }

  async function createList(listData) {
    try {
      if (isAuthenticated) {
        console.log(listData);
        const token = await getAccessTokenSilently();
        const options = {
          method: "post",
          url: "http://127.0.0.1:8000/api/lists",
          data: listData,
          headers: {
            Authorization: "Bearer " + token,
            "Content-type": "application/json",
          },
        };
        await axios(options);
        getLists();
      } else {
        console.log("You are not authenticated to make this request");
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
        const token = await getAccessTokenSilently();
        const options = {
          method: "put",
          url:
            "http://127.0.0.1:8000/api/lists/" +
            listData.id +
            "/updateordelete",
          data: listData,
          headers: {
            Authorization: "Bearer " + token,
            "Content-type": "application/json",
          },
        };
        await axios(options);
        getList(listData.id);
        getLists();
      } else {
        console.log("You are not authenticated to make this request");
      }
    } catch (error) {
      dispatch({
        type: "LIST_ERROR",
        payload: error,
      });
    }
  }

  async function deleteList(listId) {
    try {
      if (isAuthenticated) {
        const token = await getAccessTokenSilently();
        const options = {
          method: "delete",
          url: "http://127.0.0.1:8000/api/lists/" + listId + "/updateordelete",
          data: listId,
          headers: {
            Authorization: "Bearer " + token,
            "Content-type": "application/json",
          },
        };
        await axios(options);
        getLists();
      } else {
        console.log("You are not authenticated to make this request");
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
        getList,
        createList,
        updateList,
        deleteList,
      }}
    >
      {children}
    </ListContext.Provider>
  );
};
