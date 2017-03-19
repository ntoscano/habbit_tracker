import constants from "./constants";

const initialState = {
  todos: [],
  loggedTodos: [],
};

export default function addToDoReducer(state = initialState, action) {
  switch (action.type) {

    case constants.REQUEST_TODOS:
      // Should update state here to show loading spinner
      return state;
      break;

    case constants.RECEIVE_TODOS:
      return {
        todos: action.todos,
        loggedTodos: state.loggedTodos,
      }
      break;
    case constants.POST_TODO:
      return state;
      break;
    case constants.RECEIVE_TODO:
      return {
        todos: state.todos.concat(action.todo),
        loggedTodos: state.loggedTodos,
      }
      break;

    // case constants.ADD_TO_DO:
    //   fetch('http://localhost:1337/task', {
    //     method: 'POST',
    //     body: JSON.stringify({
    //       name: action.text,
    //       sticky: action.parentTaskId ? false: true,
    //     }),
    //   }).then(response => response.json())
    //   .then(json => {
    //     state.todos.concat([{
    //       id: json.id,
    //       text: json.name,
    //       count: json.count,
    //       parentTaskId: json.parentTaskId,
    //       createdAt: new Date(json.createdAt),
    //       updatedAt: new Date(json.updatedAt),
    //       sticky: json.sticky,
    //     }]);
    //   });
    //   return state;
    //   break;

    // case constants.ADD_TO_DO:
    //   return {
    //       todos: state.todos.concat([{
    //         id: action.id,
    //         text: action.text,
    //         count: 0,
    //         parentTaskId: action.parentTaskId,
    //         createdAt: new Date(),
    //         updatedAt: new Date(),
    //         sticky: action.parentTaskId ? false : true,
    //       }]),
    //       loggedTodos : state.loggedTodos,
    //     };
    //   break;
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
