const ListReducer = (state, action) => {
  switch (action.type) {
    case "GET_LISTS":
      return {
        ...state,
        loadingAllLists: false,
        lists: action.payload,
      };
    case "GET_LIST":
      return {
        ...state,
        list: action.payload,
      };
    case "POST_LOAD":
      return {
        ...state,
        loadingNewList: true,
      };
    case "POST_LIST":
      return {
        ...state,
        loadingNewList: false,
        lists: [...state.lists, action.payload],
      };
    case "PUT_LIST":
      return {
        ...state,
        lists: state.lists.map((st) => {
          if (st.id == action.payload) return action.payload;
          return st;
        }),
      };
    case "DELETE_LIST":
      return {
        ...state,
        lists: state.lists.filter((st) => st.id != action.payload),
      };
    default:
      return state;
  }
};

export default ListReducer;
