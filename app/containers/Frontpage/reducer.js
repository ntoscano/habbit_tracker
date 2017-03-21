import constants from "./constants";

const initialState = {
  todos: [],
  loggedTodos: [],
};

export default function addToDoReducer(state = initialState, action) {
  switch (action.type) {

    case constants.REQUEST_TODOS:
      // Should update state to show loading spinner
      return state;
      break;

    case constants.RECEIVE_TODOS:
      // Should update state to hide loading spinner
      return {
        todos: action.todos,
        loggedTodos: state.loggedTodos,
      }
      break;

    case constants.POST_TODO:
      // Should update state to show loading spinner
      return state;
      break;

    case constants.RECEIVE_TODO:
      // Should update state to hide loading spinner
      return {
        todos: state.todos.concat(action.todo),
        loggedTodos: state.loggedTodos,
      }
      break;

    case constants.POST_ENTRY:
      // Should update state to hide loading spinner
      return state;
      break;
    case constants.RECEIVE_ENTRY:
      return {
        todos: state.todos,
        loggedTodos: state.loggedTodos.concat(action.entry),
      }
      break;

    case constants.REQUEST_ENTRIES:
      // Should update state to show loading spinner
      return state;
      break;

    case constants.RECEIVE_ENTRIES:
      // Should update state to hide loading spinner
      console.log(action.entries);
      return {
        todos: state.todos,
        loggedTodos: action.entries,
      }
      break;

    case constants.LOG_TODO:
      return {
        todos: state.todos.map((todo, index) => {
          if (todo.id !== action.todoId) {
            return todo;
          }
          return Object.assign({}, todo, {
            count: ++todo.count,
            updatedAt: new Date(),
          })
        }),
          loggedTodos: state.loggedTodos.concat([{
            todoId: action.todoId,
            text: action.text,
            notes: action.notes,
            createdAt: new Date(),
            updatedAt: new Date(),
          }]),
        };
      break;
    case constants.EDIT_TODO:
      return {
        todos: state.todos.map((todo, index) => {
          if (todo.id !== action.id) {
            return todo;
          }
          return Object.assign({}, todo, {
            text: action.text,
            sticky: action.sticky,
            updatedAt: new Date(),
          })
        }),
        loggedTodos : state.loggedTodos,
        };
      break;

    default:
      return state;
  }
}
