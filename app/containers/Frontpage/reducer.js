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
            count: 0,
          }]),
        };
      break;
    case constants.TOGGLE_TO_DO:
      return {
          todos: state.todos.map((todo, index) => {
            if (todo.id !== action.id) {
              return todo;
            }
            return Object.assign({}, todo, {
              completed: !todo.completed,
            })
          }),
        };
        break;
      case constants.INCREMENT_TODO_COUNT:
      return {
          todos: state.todos.map((todo, index) => {
            if (todo.id !== action.id) {
              return todo;
            }
            return Object.assign({}, todo, {
              count: ++todo.count,
            })
          }),
        };
        break;
    default:
      return state;
  }
}
