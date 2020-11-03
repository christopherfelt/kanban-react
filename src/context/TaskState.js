import React, { createContext, useReducer } from "react";
import TaskReducer from "./reducers/TaskReducer";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

const initialState = {
  task: {},
  tasks: [],
  error: null,
  loading: true,
};

// let taskExample = [
//   {
//     listId: ["tasks"],
//   },
// ];

let api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1/",
  headers: {
    "Content-type": "application/json",
  },
});

export const TaskContext = createContext(initialState);

export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(TaskReducer, initialState);

  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  async function getRequestData(
    requestType,
    requestPath,
    data,
    addPath = false
  ) {
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

    return options;
  }

  async function getTasks(listId) {
    try {
      if (isAuthenticated) {
        let data = { id: listId };
        const options = await getRequestData(
          "get",
          "lists/" + listId + "/tasks"
        );
        let res = await axios(options);
        dispatch({
          type: "GET_TASKS",
          payload: { [listId]: res.data },
        });
      }
    } catch (error) {
      dispatch({
        type: "TASK_ERROR",
        payload: error,
      });
    }
  }

  async function getTask(taskId) {
    try {
      let res = await api.get("tasks/" + taskId);
      dispatch({
        type: "GET_TASK",
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: "TASK_ERROR",
        payload: error,
      });
    }
  }

  async function createTask(taskData) {
    try {
      if (isAuthenticated) {
        console.log(taskData);
        const token = await getAccessTokenSilently();
        const options = {
          method: "post",
          url: "http://127.0.0.1:8000/api/tasks",
          data: taskData,
          headers: {
            Authorization: "Bearer " + token,
            "Content-type": "application/json",
          },
        };
        await axios(options);
        getTasks();
      } else {
        console.log("You are not authenticated to make this request");
      }
    } catch (error) {
      dispatch({
        type: "TASK_ERROR",
        payload: error,
      });
    }
  }

  async function updateTask(taskData) {
    try {
      if (isAuthenticated) {
        const token = await getAccessTokenSilently();
        const options = {
          method: "put",
          url:
            "http://127.0.0.1:8000/api/tasks/" +
            taskData.id +
            "/updateordelete",
          data: taskData,
          headers: {
            Authorization: "Bearer " + token,
            "Content-type": "application/json",
          },
        };
        await axios(options);
        getTask(taskData.id);
        getTasks();
      } else {
        console.log("You are not authenticated to make this request");
      }
    } catch (error) {
      dispatch({
        type: "TASK_ERROR",
        payload: error,
      });
    }
  }

  async function deleteTask(taskId) {
    try {
      if (isAuthenticated) {
        const token = await getAccessTokenSilently();
        const options = {
          method: "delete",
          url: "http://127.0.0.1:8000/api/tasks/" + taskId + "/updateordelete",
          data: taskId,
          headers: {
            Authorization: "Bearer " + token,
            "Content-type": "application/json",
          },
        };
        await axios(options);
        getTasks();
      } else {
        console.log("You are not authenticated to make this request");
      }
    } catch (error) {
      dispatch({
        type: "TASK_ERROR",
        payload: error,
      });
    }
  }

  return (
    <TaskContext.Provider
      value={{
        task: state.task,
        tasks: state.tasks,
        error: state.error,
        loading: state.loading,
        getTasks,
        getTask,
        createTask,
        updateTask,
        deleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
