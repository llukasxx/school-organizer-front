import axios from 'axios'
import { push } from 'react-router-redux'

import { ROOT_URL } from '../ApiConfig'

import { normalize, Schema, arrayOf } from 'normalizr'
import { camelizeKeys } from 'humps'

// Constants

export const START_EVENTS_FETCH = 'school-organizer/events/START_EVENTS_FETCH'
export const FINISH_UPCOMING_EVENTS_FETCH = 'school-organizer/events/FINISH_UPCOMING_EVENTS_FETCH'
export const CHANGE_ACTIVE_FILTER = 'school-organizer/events/CHANGE_ACTIVE_FILTER'

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

export function changeActiveFilter(filter) {
  return function(dispatch) {
    dispatch( { type: CHANGE_ACTIVE_FILTER, filter: filter } )
  }
}

// Reducer
export const initialState = {}
export default function (state = initialState, action) {
  switch (action.type) {
    case START_EVENTS_FETCH:
      return { ...state, loaded: false}
    case FINISH_UPCOMING_EVENTS_FETCH:
      return {...state, loaded: true, upcomingEventsCount: action.count, activeFilter: 'all'}
    case CHANGE_ACTIVE_FILTER:
      return {...state, activeFilter: action.filter}
    default:
      return state
  }
}

//Schemas
const event = new Schema('events')

event.define({

})

