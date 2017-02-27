import constants from "./constants";

export function setPostsData(posts, users) {
  return {
    type: constants.SET_POSTS_DATA,
    posts,
    users,
  };
}

export function getPostsData(slug, tagSlug, authorSlug) {
  return {
    type: constants.FETCH_POSTS,
    slug,
    tagSlug,
    authorSlug,
  };
}
