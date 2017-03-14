import constants from "./constants";

export function addToDo(id, parentTaskId, text) {
  return {
    type: constants.ADD_TO_DO,
    id,
    parentTaskId,
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
