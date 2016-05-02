import axios from 'axios'
import { ROOT_URL } from '../ApiConfig'
// Constants
// export const constants = { }
const START_TEACHER_GROUPS_FETCH = 'school-organizer/groups/START_TEACHER_GROUPS_FETCH'
const FETCH_TEACHER_GROUPS = 'school-organizer/groups/FETCH_TEACHER_GROUPS'
const FETCH_TEACHER_GROUPS_ERROR = 'school-organizer/groups/FETCH_TEACHER_GROUPS_ERROR'
const SET_ACTIVE_GROUP = 'school-organizer/groups/SET_ACTIVE_GROUP'
// Action Creators
export function fetchTeacherGroups() {
  return function(dispatch) {
    dispatch({ type: START_TEACHER_GROUPS_FETCH})
    axios.get(`${ROOT_URL}/api/v1/groups/teacher_groups`, { 
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(function(response) {
        console.log(response)
        dispatch({ type: SET_ACTIVE_GROUP, payload: response.data.groups[0]})
        dispatch({ type: FETCH_TEACHER_GROUPS, payload: response.data.groups})
      })
      .catch(function(response) {
        dispatch({ type: FETCH_TEACHER_GROUPS_ERROR, payload: response.data})
      })
  }
}

export function setActiveGroup(group) {
  return function(dispatch) {
    dispatch({ type: SET_ACTIVE_GROUP, payload: group})
  }
}

// Reducer
export const initialState = {}
export default function (state = initialState, action) {
  switch (action.type) {
    case START_TEACHER_GROUPS_FETCH:
      return { ...state, groupItems: [], loaded: false}
    case FETCH_TEACHER_GROUPS:
      return {...state, groupItems: action.payload, loaded: true}
    case FETCH_TEACHER_GROUPS_ERROR:
      return {...state, groupItems: action.payload, loaded: false}
    case SET_ACTIVE_GROUP:
      return {...state, activeGroup: action.payload, loaded: true}
    default:
      return state
  }
}
