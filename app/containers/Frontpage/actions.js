import constants from "./constants";

const config = {
  basePath: 'http://localhost:1337/task',
}
config.taskPath = config.basePath + '/task';

// http://redux.js.org/docs/advanced/AsyncActions.html
export function fetchToDos() {
  return function (dispatch) {
    dispatch(requestToDos())
    return fetch(config.taskPath)
      .then(response => response.json())
      .then(json =>
        dispatch(receiveToDos(json))
      )
      .catch(e => console.error('fetchToDoes failed', e));
  }
}

export function requestToDos() {
  return {
    type: constants.REQUEST_TODOS,
  };
}

export function receiveToDos(todos) {
  return {
    type: constants.RECEIVE_TODOS,
    todos,
  };
}

export function addToDo(id, parentTaskId, name) {
  return function (dispatch) {

    dispatch(postToDo(id, parentTaskId, name))

    return fetch(config.taskPath, {
      method: 'POST',
      body: JSON.stringify({
        name: name,
        sticky: parentTaskId ? false: true,
      }),
    }).then(response => response.json())
    .then(json => {
      dispatch(receiveToDo(json))
    })
    .catch(e => console.error('addToDo failed', e));
  }
}

export function postToDo(id, parentTaskId, name) {
  return {
    type: constants.POST_TODO,
    id,
    parentTaskId,
    name,
  };
}

export function receiveToDo(todo) {
  return {
    type: constants.RECEIVE_TODO,
    todo,
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
