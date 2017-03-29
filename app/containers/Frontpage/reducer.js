import constants from "./constants";

const initialState = {
  todos: [],
  loggedTodos: [],
  user: {},
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
        user: state.user,
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
        user: state.user,
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
        user: state.user,
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
        user: state.user,
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
        user: state.user,
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
        user: state.user,
      }
      break;

    case constants.POST_USER:
      // Should update state to hide loading spinner
      return state;
      break;

    case constants.RECEIVE_USER:
      return {
        todos: state.todos,
        loggedTodos: state.loggedTodos,
        user: action.user,
      }
      break;

    case constants.POST_LOGIN:
      // Should update state to hide loading spinner
      return state;
      break;

    case constants.RECEIVE_LOGIN:
      return {
        todos: state.todos,
        loggedTodos: state.loggedTodos,
        user: action.user,
      }
      break;

    case constants.GET_LOGOUT:
      // Should update state to hide loading spinner
      return state;
      break;

    case constants.RECEIVE_LOGOUT:
      return {
        todos: state.todos,
        loggedTodos: state.loggedTodos,
        user: {},
      }
      break;
    default:
      return state;
  }
}
