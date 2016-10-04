import axios from 'axios'
import { push } from 'react-router-redux'

import { ROOT_URL } from '../ApiConfig'

import {toastr} from 'react-redux-toastr'

import { normalize, Schema, arrayOf } from 'normalizr'
import { camelizeKeys } from 'humps'

// Constants

export const START_EVENTS_FETCH = 'school-organizer/events/START_EVENTS_FETCH'
export const FINISH_UPCOMING_EVENTS_FETCH = 'school-organizer/events/FINISH_UPCOMING_EVENTS_FETCH'
export const CHANGE_ACTIVE_FILTER = 'school-organizer/events/CHANGE_ACTIVE_FILTER'


export const INVITE_GROUP = 'school-organizer/events/INVITE_GROUP'
export const REMOVE_GROUP = 'school-organizer/events/REMOVE_GROUP'
export const REMOVE_ALL_GROUPS = 'school-organizer/events/REMOVE_ALL_GROUPS'
//Actions

export function fetchUpcomingEvents(page = 1) {
  return function(dispatch) {
    dispatch( { type: START_EVENTS_FETCH } )
    axios.get(`${ROOT_URL}/api/v1/events/get_events`, { 
      headers: { authorization: localStorage.getItem('token') },
      params: { page: page }
    })
    .then(function(response) {
        console.log(response)
        const camelized = camelizeKeys(response.data)
        const normalizedResponse = normalize(camelized, { events: arrayOf(event) })
        dispatch({ type: FINISH_UPCOMING_EVENTS_FETCH,
                   paginated: true,
                   response: normalizedResponse,
                   count: response.data.count
                 })
      })
      .catch(function(response) {
        if(response.status == 401) {
          dispatch({ type: UNAUTH_USER })
          dispatch(push('/'))
        }
        dispatch({ type: FETCH_TEACHER_GROUPS_ERROR, payload: response.data})
        toastr.warning('Warning', 'Something bad happened')
      })
  }
}

export function fetchUpcomingConnectedEvents(page = 1) {
  return function(dispatch) {
    dispatch( { type: START_EVENTS_FETCH } )
    axios.get(`${ROOT_URL}/api/v1/events/get_connected_events`, { 
      headers: { authorization: localStorage.getItem('token') },
      params: { page: page }
    })
    .then(function(response) {
        console.log(response)
        const camelized = camelizeKeys(response.data)
        const normalizedResponse = normalize(camelized, { events: arrayOf(event) })
        dispatch({ type: FINISH_UPCOMING_EVENTS_FETCH,
                   paginated: true,
                   response: normalizedResponse,
                   count: response.data.count
                 })
      })
      .catch(function(response) {
        if(response.status == 401) {
          dispatch({ type: UNAUTH_USER })
          dispatch(push('/'))
        }
        dispatch({ type: FETCH_TEACHER_GROUPS_ERROR, payload: response.data})
        toastr.warning('Warning', 'Something bad happened')
      })
  }
}

export function fetchUpcomingCreatedEvents(page = 1) {
  return function(dispatch) {
    dispatch( { type: START_EVENTS_FETCH } )
    axios.get(`${ROOT_URL}/api/v1/events/get_created_events`, { 
      headers: { authorization: localStorage.getItem('token') },
      params: { page: page }
    })
    .then(function(response) {
        console.log(response)
        const camelized = camelizeKeys(response.data)
        const normalizedResponse = normalize(camelized, { events: arrayOf(event) })
        dispatch({ type: FINISH_UPCOMING_EVENTS_FETCH,
                   paginated: true,
                   response: normalizedResponse,
                   count: response.data.count
                 })
      })
      .catch(function(response) {
        if(response.status == 401) {
          dispatch({ type: UNAUTH_USER })
          dispatch(push('/'))
        }
        dispatch({ type: FETCH_TEACHER_GROUPS_ERROR, payload: response.data})
        toastr.warning('Warning', 'Something bad happened')
      })
  }
}

export function sendEvent(event) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/api/v1/events/new_event`, { event }, {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(function(response) {
        console.log(response)
        toastr.success('Event', 'Has been successfully added.')
      })
      .catch(function(response) {
        console.log(response)
        if(response.status == 401) {
          dispatch({ type: UNAUTH_USER })
          dispatch(push('/'))
        }
        toastr.warning('Warning', 'Something bad happened.')
      })
  }}

export function addGroup(group) {
  return function(dispatch) {
    dispatch( { type: INVITE_GROUP, group: group } )
  }
}

export function removeGroup(group) {
  return function(dispatch) {
    dispatch( { type: REMOVE_GROUP, group: group } )
  }
}

export function removeAllGroups() {
  return function(dispatch) {
    dispatch( { type: REMOVE_ALL_GROUPS } )
  }
}

export function changeActiveFilter(filter) {
  return function(dispatch) {
    dispatch( { type: CHANGE_ACTIVE_FILTER, filter: filter } )
  }
}

// Reducer
export const initialState = {loaded: false, activeFilter: 'all', invitedGroupsIds: []}
export default function (state = initialState, action) {
  switch (action.type) {
    case START_EVENTS_FETCH:
      return { ...state, loaded: false}
    case FINISH_UPCOMING_EVENTS_FETCH:
      return {...state, loaded: true, upcomingEventsCount: action.count}
    case CHANGE_ACTIVE_FILTER:
      return {...state, activeFilter: action.filter}
    case INVITE_GROUP:
      if(state.invitedGroupsIds.includes(action.group)) {
        return state
      } else {
        return {...state, invitedGroupsIds: [
          ...state.invitedGroupsIds,
          action.group
          ]}
      }
    case REMOVE_GROUP:
      const { group } = action
      if(state.invitedGroupsIds.includes(group)) {
        return {...state, invitedGroupsIds: [
            ...state.invitedGroupsIds.filter(groupId => group !== groupId)
          ]}
      } else {
        return state
      }
    case REMOVE_ALL_GROUPS:
      return {...state, invitedGroupsIds: []}
    default:
      return state
  }
}

//Schemas
const event = new Schema('events')

event.define({

})

