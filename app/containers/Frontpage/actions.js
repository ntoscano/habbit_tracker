import constants from "./constants";
import {v4} from 'node-uuid';

const config = {
  basePath: 'http://localhost:1337',
}
config.taskPath = config.basePath + '/task';
config.entryPath = config.basePath + '/entry';

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

export function addToDo(parentTaskId, name) {
  return function (dispatch) {

    dispatch(postToDo(parentTaskId, name))

    return fetch(config.taskPath, {
      method: 'POST',
      body: JSON.stringify({
        id: v4(),
        name: name,
        sticky: parentTaskId ? false: true,
        parent_task_id: parentTaskId ? parentTaskId : undefined,
      }),
    }).then(response => response.json())
    .then(json => {
      dispatch(receiveToDo(json))
    })
    .catch(e => console.error('addToDo failed', e));
  }
}

export function postToDo(parentTaskId, name) {
  return {
    type: constants.POST_TODO,
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

export function addEntries(entries) {
  return function (dispatch) {

  }
}

export function addEntry(id, todoId, parentEntryId, content) {
  return function (dispatch) {
    dispatch(postEntry(todoId, parentEntryId, content))
    return fetch(config.entryPath, {
      method: 'POST',
      body: JSON.stringify({
        id: id,
        content: content,
        task_id: todoId,
        parent_entry_id: parentEntryId,
        check: true,
      }),
    }).then(response => response.json())
    .then(json => {
      dispatch(receiveEntry(json))
    })
    .catch(e => console.error('addEntry failed', e));
  }
}

export function postEntry(todoId, parentEntryId, content) {
  return {
    type: constants.POST_ENTRY,
    todoId,
    parentEntryId,
    content,
  };
}

export function receiveEntry(entry) {
  return {
    type: constants.POST_ENTRY,
    entry,
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
