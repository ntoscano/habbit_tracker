import constants from "./constants";


const initialState = {
  posts: [],
  users: {},
  todos: [],
};

export function blogReducer(state = initialState, action) {
  switch (action.type) {
    case constants.SET_POSTS_DATA:
      return {
        posts: action.posts,
        users: action.users,
      };
    default:
      return state;
  }
}

export default function addToDoReducer(state = initialState, action) {
  switch (action.type) {
    case constants.ADD_TO_DO:
    console.log('addToDoReducer action.todos ' + state);
      return {
          posts: action.posts,
          users: action.users,
          todos: state.todos.concat([action.name]),
        };
      break;
    default:
      return state;
  }
}
