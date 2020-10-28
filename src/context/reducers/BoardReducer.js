const BoardReducer = (state, action) => {
  switch (action.type) {
    case "GET_BOARDS":
      return {
        ...state,
        loading: false,
        boards: action.payload,
      };
    case "GET_BOARD":
      return {
        ...state,
        loading: false,
        board: action.payload,
      };
    case "POST_BOARDS":
      return {
        ...state,
        loading: false,
        boards: action.payload,
      };
    default:
      return state;
  }
};

export default BoardReducer;
