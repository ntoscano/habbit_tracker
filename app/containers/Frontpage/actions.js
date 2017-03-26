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

// export function logToDo(todoId, text, notes) {
//   return {
//     type: constants.LOG_TODO,
//     todoId,
//     text,
//     notes,
//   };
// }

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
    type: constants.RECEIVE_ENTRY,
    entry,
  };
}

export function fetchEntries() {
  return function (dispatch) {
    dispatch(requestEntries())
    return fetch(config.entryPath)
      .then(response => response.json())
      .then(json =>
        dispatch(receiveEntries(json))
      )
      .catch(e => console.error('fetchEntries failed', e));
  }
}

export function requestEntries() {
  return {
    type: constants.REQUEST_ENTRIES,
  };
}

export function receiveEntries(entries) {
  return {
    type: constants.RECEIVE_ENTRIES,
    entries,
  };
}

export function editEntry(entryId, content, check) {
  return function (dispatch) {

    dispatch(putEntry(entryId, content, check));

    return fetch(config.entryPath + '/' + entryId, {
      method: 'PATCH',
      body: JSON.stringify({
        content: content,
        check: check,
      }),
    }).then(response => response.json())
    .then(json => {
      dispatch(receiveEditedEntry(json))
    })
    .catch(e => console.error('editEntry failed', e));
  }
}

export function putEntry(entryId, content, check) {
  return {
    type: constants.PUT_ENTRY,
    entryId,
    content,
    check,
  };
}

export function receiveEditedEntry(entry) {
  return {
    type: constants.RECEIVE_EDITED_ENTRY,
    entry,
  };
}

export function editToDo(id, name, sticky) {
  return function (dispatch) {

    dispatch(putEntry(id, name, sticky));

    return fetch(config.taskPath + '/' + id, {
      method: 'PATCH',
      body: JSON.stringify({
        name: name,
        sticky: sticky,
      }),
    }).then(response => response.json())
    .then(json => {
      dispatch(receiveEditedToDo(json))
    })
    .catch(e => console.error('editToDo failed', e));
  }
}

export function putToDo(id, name, sticky) {
  return {
    type: constants.PUT_TODO,
    id,
    name,
    sticky,
  };
}

export function receiveEditedToDo(todo) {
  return {
    type: constants.RECEIVE_EDITED_TODO,
    todo,
  };
}
