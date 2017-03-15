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

export function editToDo(id, text, sticky) {
  return {
    type: constants.EDIT_TODO,
    id,
    text,
    sticky,
  };
}
