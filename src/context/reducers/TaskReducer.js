const TaskReducer = (state, action) => {
  switch (action.type) {
    case "GET_TASKS":
      return {
        ...state,
        loading: false,
        tasks: handleGetTasks(state, action),
      };
    case "GET_TASK":
      return {
        ...state,
        loading: false,
        task: action.payload,
      };
    case "POST_TASK":
      return {
        ...state,
        loading: false,
        tasks: handlePostTask(state, action),
      };
    case "PUT_BODY_TASK":
      return {
        ...state,
        loading: false,
        tasks: handlePutBodyTask(state, action),
      };
    case "PUT_LISTID_TASK":
      return {
        ...state,
        loading: false,
        tasks: handlePutListIdTask(state, action),
      };
    default:
      return state;
  }
};

export default TaskReducer;

const handleGetTasks = (state, action) => {
  let list_number = Object.keys(action.payload)[0];
  let list_exists = false;
  for (let i = 0; i < state.tasks.length; i++) {
    let list = state.tasks[i];
    if (list_number in list) {
      state.tasks[i] = { [list_number]: action.payload[list_number] };
      list_exists = true;
      break;
    }
  }
  if (!list_exists) {
    state.tasks.push(action.payload);
  }
  return state.tasks;
};

const handlePostTask = (state, action) => {
  let list_number = Object.keys(action.payload)[0];
  for (let i = 0; i < state.tasks.length; i++) {
    let list = state.tasks[i];
    if (list_number in list) {
      list[list_number].push(action.payload[list_number]);
    }
  }
  return state.tasks;
};

const handlePutBodyTask = (state, action) => {
  let list_number = Object.keys(action.payload)[0];
  for (let i = 0; i < state.tasks.length; i++) {
    let list = state.tasks[i];
    if (list_number in list) {
      let tasks = list[list_number];
      for (let j = 0; j < tasks.length; j++) {
        let task = tasks[j];
        if (task.id == action.payload[list_number]["id"]) {
          task.body = action.payload[list_number]["body"];
        }
      }
    }
  }
  return state.tasks;
};

const handlePutListIdTask = (state, action) => {
  let new_payload = {};
  let list_number = Object.keys(action.payload)[0];
  for (let i = 0; i < state.tasks.length; i++) {
    let list = state.tasks[i];
    if (list_number in list) {
      list[list_number] = list[list_number].filter(
        (t) => t.id != action.payload[list_number]["id"]
      );
      new_payload = {
        [action.payload[list_number]["list_id"]]: action.payload[list_number],
      };
    }
  }
  console.log(state.tasks);
  action.payload = new_payload;
  return handlePostTask(state, action);
};
