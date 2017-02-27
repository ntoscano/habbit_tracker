import constants from "./constants";

const initialState = {
  todos: [],
};

export default function addToDoReducer(state = initialState, action) {
  switch (action.type) {
    case constants.ADD_TO_DO:
      return {
          todos: state.todos.concat([{
            id: action.id,
            text: action.text,
            completed: false,
          }]),
        };
      break;
    default:
      return state;
  }
}
