import constants from "./constants";

// http://redux.js.org/docs/advanced/AsyncActions.html
export function fetchToDos() {
  return function (dispatch) {
    dispatch(requestToDos())
    return fetch('http://localhost:1337/task')
      .then(response => response.json())
      .then(json =>
        dispatch(receiveToDos(json))
      )
  }
}

export function requestToDos() {
  return {
    type: constants.FETCH_TODOS,
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

    return fetch('http://localhost:1337/task', {
      method: 'POST',
      body: JSON.stringify({
        name: name,
        sticky: parentTaskId ? false: true,
      }),
    }).then(response => response.json())
    .then(json => {
      dispatch(receiveToDo(json))
    });
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
