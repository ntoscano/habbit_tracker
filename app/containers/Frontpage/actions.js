import constants from "./constants";
import {v4} from 'node-uuid';

const config = {
  basePath: 'http://localhost:1337',
}
config.taskPath = config.basePath + '/task';
config.entryPath = config.basePath + '/entry';
config.userPath = config.basePath + '/user';
config.loginPath = config.basePath + '/login';
config.logoutPath = config.basePath + '/logout';

// http://redux.js.org/docs/advanced/AsyncActions.html
export function fetchToDos() {
  return function (dispatch) {
    dispatch(requestToDos())
    return fetch(config.taskPath, {
      method: 'GET',
      credentials: 'include',
    })
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

export function addToDo(parentTaskId, name, ownerId) {
  return function (dispatch) {
    dispatch(postToDo(parentTaskId, name, ownerId))

    return fetch(config.taskPath, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        id: v4(),
        name: name,
        sticky: parentTaskId ? false: true,
        parent_task_id: parentTaskId ? parentTaskId : undefined,
        owner_id: ownerId
      }),
    }).then(response => response.json())
    .then(json => {
      dispatch(receiveToDo(json))
    })
    .catch(e => console.error('addToDo failed', e));
  }
}

export function postToDo(parentTaskId, name, ownerId) {
  return {
    type: constants.POST_TODO,
    parentTaskId,
    name,
    ownerId,
  };
}

export function receiveToDo(todo) {
  return {
    type: constants.RECEIVE_TODO,
    todo,
  };
}

export function addEntry(id, todoId, parentEntryId, content) {
  return function (dispatch) {
    dispatch(postEntry(todoId, parentEntryId, content))
    return fetch(config.entryPath, {
      method: 'POST',
      credentials: 'include',
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
    return fetch(config.entryPath, {
      method: 'GET',
      credentials: 'include',
    })
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
    // TODO should remove parent_entry_id from subtasks if parent is now unchecked
    dispatch(putEntry(entryId, content, check));

    return fetch(config.entryPath + '/' + entryId, {
      method: 'PATCH',
      credentials: 'include',
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
      credentials: 'include',
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

export function addUser(email, password) {
  return function (dispatch) {
    dispatch(postUser(email, password))
    return fetch(config.userPath, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        email,
        password,
      }),
    }).then(response => response.json())
    .then(json => {
      dispatch(receiveUser(json))
    })
    .catch(e => console.error('addUser failed', e));
  }
}

export function postUser(email, password) {
  return {
    type: constants.POST_USER,
    email,
    password,
  };
}

export function receiveUser(user) {
  return {
    type: constants.RECEIVE_USER,
    user,
  };
}

export function login(email, password) {
  return function (dispatch) {
    dispatch(postLogin(email, password))
    return fetch(config.loginPath, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        email,
        password,
      }),
    })
    .then(response => response.json())
    .then(json => {
      dispatch(receiveLogin(json.user))
    })
    .catch(e => console.error('login failed', e));
  }
}

export function postLogin(email, password) {
  return {
    type: constants.POST_LOGIN,
    email,
    password,
  };
}

export function receiveLogin(user) {
  return {
    type: constants.RECEIVE_LOGIN,
    user,
  };
}

export function logout() {
  return function (dispatch) {
    dispatch(getLogout())
    return fetch(config.logoutPath, {
      method: 'GET',
      credentials: 'include',
    })
    .then(response => response.json())
    .then(json => {
      dispatch(receiveLogout())
    })
    .catch(e => console.error('logout failed', e));
  }
}

export function getLogout() {
  return {
    type: constants.GET_LOGOUT,
  };
}

export function receiveLogout() {
  return {
    type: constants.RECEIVE_LOGOUT,
  };
}
