const ListReducer = (state, action) => {
  switch (action.type) {
    case "GET_LISTS":
      return {
        ...state,
        loading: false,
        boards: action.payload,
      };
    case "GET_LIST":
      return {
        ...state,
        loading: false,
        board: action.payload,
      };
    case "POST_LISTS":
      return {
        ...state,
        loading: false,
        boards: action.payload,
      };
    default:
      return state;
  }
};

export default ListReducer;
