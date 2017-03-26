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
    case constants.PUT_ENTRY:
      // Should update state to hide loading spinner
      return state;
      break;

    case constants.RECEIVE_EDITED_ENTRY:
      let editedEntries = state.loggedTodos.map((entry, index) => {
        return Object.assign({}, entry, {
          content: entry.id === action.entry.id ? action.entry.content : entry.content,
          check: entry.id === action.entry.id ? action.entry.check : entry.check,
        })
      });
      return {
        todos: state.todos,
        loggedTodos: editedEntries,
      }
      break;
    case constants.REQUEST_ENTRIES:
      // Should update state to show loading spinner
      return state;
      break;

    case constants.RECEIVE_ENTRIES:
      // Should update state to hide loading spinner
      return {
        todos: state.todos,
        loggedTodos: action.entries,
      }
      break;
    case constants.PUT_TODO:
      // Should update state to hide loading spinner
      return state;
      break;
    case constants.RECEIVE_EDITED_TODO:
      let editedTodos = state.todos.map((todo, index) => {
        return Object.assign({}, todo, {
          name: todo.id === action.todo.id ? action.todo.name : todo.name,
          sticky: todo.id === action.todo.id ? action.todo.sticky : todo.sticky,
        })
      });

      return {
        todos: editedTodos,
        loggedTodos: state.loggedTodos,
      }
      break;

    default:
      return state;
  }
}
