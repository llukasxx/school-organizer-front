import axios from 'axios'
import { ROOT_URL } from '../ApiConfig'
import {toastr} from 'react-redux-toastr'
import { normalize, Schema, arrayOf } from 'normalizr'
import { camelizeKeys } from 'humps'

// Constants
// export const constants = { }
export const START_INBOX_FETCH = 'school-organizer/messages/START_INBOX_FETCH'
export const FINISH_INBOX_FETCH = 'school-organizer/messages/FINISH_INBOX_FETCH'
// Action Creators
// export const actions = { }
export const getInbox = () => {
  return function(dispatch) {
    dispatch({ type: START_INBOX_FETCH })
    axios.get(`${ROOT_URL}/api/v1/messages/get_inbox`, { 
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(function(response) {
        console.log(response)
        dispatch({type: FINISH_INBOX_FETCH})
      })
      .catch(function(response) {

      })
  }
}

// Reducer
export const initialState = {}
export default function (state = initialState, action) {
  switch (action.type) {
    case START_INBOX_FETCH:
      return {...state, loaded: false}
    case FINISH_INBOX_FETCH:
      return {...state, loaded: true}
    default:
      return state
  }
}
