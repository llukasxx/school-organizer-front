import axios from 'axios'
import { push } from 'react-router-redux';

import { ROOT_URL } from '../ApiConfig'
// Constants
// export const constants = { }
export const START_AUTH = 'school-organizer/auth/START_AUTH'
export const FINISH_AUTH = 'school-organizer/auth/FINISH_AUTH'
export const AUTH_ERROR = 'school-organizer/auth/AUTH_ERROR'
export const UNAUTH_USER = 'school-organizer/auth/UNAUTH_USER'
// Action Creators
// export const actions = { }

// sign in
export function signInUser(email, password) {
  return function(dispatch) {
    dispatch({ type: START_AUTH })
    return (
      axios.post(`${ROOT_URL}/api/v1/sessions`, {user: {email, password}})
        .then(function (response) {
          dispatch({ type: FINISH_AUTH, payload: response})
          setLocalStorage(response.data.auth_token, response.data.user, response.data.accountType)
          dispatch(push('/' + response.data.accountType))
        })
        .catch(function (response) {
          dispatch({ type: AUTH_ERROR, payload: response.data.error})
        }))
  }
}

function setLocalStorage(token, currentUser, accountType) {
  localStorage.setItem('token', token)
  localStorage.setItem('currentUser', currentUser)
  localStorage.setItem('accountType', accountType)
}
function removeLocalStorage() {
  localStorage.removeItem('token')
  localStorage.removeItem('currentUser')
  localStorage.removeItem('accountType')
}

// signout user
export function signOutUser() {
  removeLocalStorage()
  return function(dispatch) {
    return (
      dispatch({ type: UNAUTH_USER })
    )
  }
}

// redirect action
export function redirectUser() {
  return function(dispatch) {
    const accType = localStorage.getItem('accountType')
    switch(accType) {
      case 'teacher':
        return dispatch(push('/teacher'))
      case 'student':
        return dispatch(push('/student'))
      default:
        return dispatch(push('/'))
    }
  }
}


// Reducer
export const initialState = {}
export default function (state = initialState, action) {
  switch (action.type) {
    case START_AUTH:
      return { ...state, loading: true };
    case FINISH_AUTH:
      return { ...state, authInfo: "", loading: false, authenticated: true };
    case AUTH_ERROR:
      return { ...state, authInfo: action.payload, loading: false };
    case UNAUTH_USER:
      return { ...state, authInfo: action.payload, authenticated: false };
    default:
      return state
  }
}
