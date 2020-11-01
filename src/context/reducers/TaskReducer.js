const TaskReducer = (state, action) => {
  switch (action.type) {
    case "GET_TASKS":
      return {
        ...state,
        loading: false,
        tasks: action.payload,
      };
    case "GET_TASK":
      return {
        ...state,
        loading: false,
        task: action.payload,
      };
    case "POST_TASKS":
      return {
        ...state,
        loading: false,
        tasks: action.payload,
      };
    default:
      return state;
  }
};

export default TaskReducer;

/*

let state = {
    tasks: [
      {
        1:[
          {
            id: "t1",
            body: "task 1 for list 1"
          },
          {
            id:"t2",
            body: "task 2 for list 1",
  
          }
        ]
      },
      {
        2:[
          {
            id:"t3",
            body: "task 1 for list 2"
          }
        ]
      }
    ]
  }
  
  // let payload = {2: [{id:"t4", body: "task 2 for list 2"}]}
  let payload = {3: [{id: "t5", body: "task 1 for list 3"}]}
  
  let tasks = {
    tasks: state.tasks
  }
  
  let type = "get_tasks"
  
  // if(type == "get_tasks"){
  //   for(let i = 0; i < state.tasks.length; i++){
  //     let list = state.tasks[i];
  //     list_number = Object.keys(payload)[0]
  //     if(list_number in list){
  //       let newList = list[list_number].concat(payload[list_number])
  //       state.tasks[i] = {[list_number]: newList}
  //       break
  //     }
  //   }
  // }
  
  function appReducer (state, type, payload){
    if(type == "get_tasks"){
      let list_number = Object.keys(payload)[0]
      let list_exists = false
      for(let i = 0; i < state.tasks.length; i++){
        let list = state.tasks[i]
        if(list_number in list ){
          state.tasks[i] = {[list_number]: payload[list_number]}
          list_exists = true
          break
        }
      }
      if(!list_exists){
        state.tasks.push(payload)
      }
  
    }
    return state
  }
  
  let newState = appReducer(state, type, payload)
  console.log(newState.tasks)
  
  
  // return { ...state, loading:false, tasks: addTasksToLists}

  */
