import constants from "./constants";

export function addToDo(id, text) {
  return {
    type: constants.ADD_TO_DO,
    id,
    text,
  };
}
