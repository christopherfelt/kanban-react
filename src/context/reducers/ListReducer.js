const ListReducer = (state, action) => {
  switch (action.type) {
    case "GET_LISTS":
      return {
        ...state,
        loading: false,
        lists: action.payload,
      };
    case "GET_LIST":
      return {
        ...state,
        loading: false,
        list: action.payload,
      };
    case "POST_LISTS":
      return {
        ...state,
        loading: false,
        lists: action.payload,
      };
    default:
      return state;
  }
};

export default ListReducer;
