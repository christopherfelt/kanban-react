const BoardReducer = (state, action) => {
  switch (action.type) {
    case "GET_BOARDS":
      return {
        ...state,
        loadingAllBoards: false,
        boards: action.payload,
      };
    case "GET_BOARD":
      return {
        ...state,
        board: action.payload,
      };
    case "POST_LOAD":
      return {
        ...state,
        loadingNewBoard: true,
      };
    case "POST_BOARD":
      return {
        ...state,
        loadingNewBoard: false,
        boards: [...state.boards, action.payload],
      };
    case "PUT_BOARD":
      return {
        ...state,
        boards: state.boards.map((b) => {
          if (b.id == action.payload.id) return action.payload;
          return b;
        }),
      };
    case "DELETE_BOARD":
      return {
        ...state,
        boards: state.boards.filter((b) => b.id != action.payload),
      };
    default:
      return state;
  }
};

export default BoardReducer;
