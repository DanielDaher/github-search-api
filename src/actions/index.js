//actions
/* import { Octokit } from "https://cdn.skypack.dev/@octokit/core"; */

/* const octokit = new Octokit({ auth: `personal-access-token123`}); */

const ADD_USER = 'ADD_USER';
const SAVE_USERS = 'SAVE_USERS';
const FILTER_USERS = 'FILTER_USERS';

export function addUser(payload){
  return {
    type: ADD_USER,
    user: payload,
  }
};

export function saveUsers(payload){
  return {
    type: SAVE_USERS,
    users: payload,
  };
}

export function filterUsers(payload) {
  return {
    type: FILTER_USERS,
    payload,
  }
}

export function fetchAPI(payload){
  return async (dispatch) => {
    const request = await fetch(`https://api.github.com/search/users?q=${payload}`);
    const response = await request.json();
    console.log(response);
    return dispatch(saveUsers(response.items.slice(0, 5)));
  };
};
