import constants from "./constants";

const initialState = {
  todos: [],
  loggedTodos: [],
};

export default function addToDoReducer(state = initialState, action) {
  switch (action.type) {
    case constants.ADD_TO_DO:
      return {
          todos: state.todos.concat([{
            id: action.id,
            text: action.text,
            count: 0,
            parentTaskId: action.parentTaskId,
            createdAt: new Date(),
            updatedAt: new Date(),
          }]),
          loggedTodos : state.loggedTodos,
        };
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
    default:
      return state;
  }
}
