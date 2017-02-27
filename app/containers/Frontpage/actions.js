import constants from "./constants";

export function addToDo(id, text) {
  return {
    type: constants.ADD_TO_DO,
    id,
    text,
  };
}

export function logToDo(todoId, text, notes) {
  return {
    type: constants.LOG_TODO,
    todoId,
    text,
    notes,
  };
}
