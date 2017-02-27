import constants from "./constants";


const initialState = {
  posts: [],
  users: {},
};

export default function blogReducer(state = initialState, action) {
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
