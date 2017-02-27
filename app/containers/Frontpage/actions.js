import constants from "./constants";

export function addToDo(id, text) {
  return {
    type: constants.ADD_TO_DO,
    id,
    text,
  };
}

export function toggleToDo(id) {
  return {
    type: constants.TOGGLE_TO_DO,
    id,
  };
}

export function incrementToDoCount(id) {
  return {
    type: constants.INCREMENT_TODO_COUNT,
    id,
  };
}
