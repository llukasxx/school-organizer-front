import axios from 'axios'
import { ROOT_URL } from '../ApiConfig'
import { UNAUTH_USER } from './AuthReducer'
import {toastr} from 'react-redux-toastr'
import { normalize, Schema, arrayOf } from 'normalizr'
import { camelizeKeys } from 'humps'

// Constants
// export const constants = { }
export const START_STUDENTS_FETCH = 'school-organizer/receivers/START_STUDENTS_FETCH'
export const FINISH_STUDENTS_FETCH = 'school-organizer/receivers/FINISH_STUDENTS_FETCH'

export const START_TEACHERS_FETCH = 'school-organizer/receivers/START_TEACHERS_FETCH'
export const FINISH_TEACHERS_FETCH = 'school-organizer/receivers/FINISH_TEACHERS_FETCH'

export const START_GROUPS_FETCH = 'school-organizer/receivers/START_GROUPS_FETCH'
export const FINISH_GROUPS_FETCH = 'school-organizer/receivers/FINISH_GROUPS_FETCH'

export const START_LESSONS_FETCH = 'school-organizer/receivers/START_LESSONS_FETCH'
export const FINISH_LESSONS_FETCH = 'school-organizer/receivers/FINISH_LESSONS_FETCH'

export const CHANGE_ACTIVE_TAB = 'school-organizer/receivers/CHANGE_ACTIVE_TAB'
export const PAGINATED_ENTITIES = 'school-organizer/receivers/PAGINATED_ENTITIES'

export const ADD_RECEIVER = 'school-organizer/receivers/ADD_RECEIVER'
export const REMOVE_RECEIVER = 'school-organizer/receivers/REMOVE_RECEIVER'



// Action Creators
// export const actions = { }
export const getPaginatedStudents = (page = 1, query = '') => {
  return function(dispatch) {
    dispatch({type: START_STUDENTS_FETCH})
    axios.get(`${ROOT_URL}/api/v1/receivers_students`, { 
      headers: { authorization: localStorage.getItem('token') },
      params: { page: page, query: query }
    })
      .then(function(response) {
        let camelized = camelizeKeys(response.data)
        let normalized = normalize(camelized, { 
          students: arrayOf(student)
        })
        dispatch({type: FINISH_STUDENTS_FETCH, 
                  paginated: true,
                  response: normalized, 
                  count: response.data.meta.count,
                  page: page
                })
      })
      .catch(function(response) {
        if(response.status == 401) {
          dispatch({ type: UNAUTH_USER })
          dispatch(push('/'))
        }
        toastr.warning('Warning', 'Something bad happened')
      })
  }
}

export const getPaginatedTeachers = (page = 1, query = '') => {
  return function(dispatch) {
    dispatch({type: START_TEACHERS_FETCH})
    axios.get(`${ROOT_URL}/api/v1/receivers_teachers`, { 
      headers: { authorization: localStorage.getItem('token') },
      params: { page: page, query: query }
    })
      .then(function(response) {
        let camelized = camelizeKeys(response.data)
        let normalized = normalize(camelized, { 
          teachers: arrayOf(teacher)
        })
        dispatch({type: FINISH_TEACHERS_FETCH, 
                  paginated: true,
                  response: normalized, 
                  count: response.data.meta.count,
                  page: page
                })
      })
      .catch(function(response) {
        if(response.status == 401) {
          dispatch({ type: UNAUTH_USER })
          dispatch(push('/'))
        }
        toastr.warning('Warning', 'Something bad happened')
      })
  }
}

export const getPaginatedGroups = (page = 1, query = '') => {
  return function(dispatch) {
    dispatch({type: START_GROUPS_FETCH})
    axios.get(`${ROOT_URL}/api/v1/receivers_groups`, { 
      headers: { authorization: localStorage.getItem('token') },
      params: { page: page, query: query }
    })
      .then(function(response) {
        let camelized = camelizeKeys(response.data)
        let normalized = normalize(camelized, { 
          groups: arrayOf(group)
        })
        dispatch({type: FINISH_GROUPS_FETCH, 
                  paginated: true,
                  response: normalized, 
                  count: response.data.meta.count,
                  page: page
                })
      })
      .catch(function(response) {
        if(response.status == 401) {
          dispatch({ type: UNAUTH_USER })
          dispatch(push('/'))
        }
        toastr.warning('Warning', 'Something bad happened')
      })
  }
}

export const getPaginatedLessons = (page = 1, query = '') => {
  return function(dispatch) {
    dispatch({type: START_LESSONS_FETCH})
    axios.get(`${ROOT_URL}/api/v1/receivers_lessons`, { 
      headers: { authorization: localStorage.getItem('token') },
      params: { page: page, query: query }
    })
      .then(function(response) {
        let camelized = camelizeKeys(response.data)
        let normalized = normalize(camelized, { 
          lessons: arrayOf(lesson)
        })
        dispatch({type: FINISH_LESSONS_FETCH, 
                  paginated: true,
                  response: normalized, 
                  count: response.data.meta.count,
                  page: page
                })
      })
      .catch(function(response) {
        if(response.status == 401) {
          dispatch({ type: UNAUTH_USER })
          dispatch(push('/'))
        }
        toastr.warning('Warning', 'Something bad happened')
      })
  }
}

export const changeActiveTab = (activeTab = 'students') => {
  return function(dispatch) {
    dispatch({type: CHANGE_ACTIVE_TAB, activeTab: activeTab})
  }
}

export const addReceiver = (receiver) => {
  return function(dispatch) {
    dispatch({type: ADD_RECEIVER, receiver: receiver})
  }
}

export const removeReceiver = (receiver, index) => {
  return function(dispatch) {
    dispatch({type: REMOVE_RECEIVER, receiverIndex: index})
  }
}

// Reducer
export const initialState = { activeTab: 'students', activePage: 1,
                              students: { loaded: false, count: 0 },
                              teachers: { loaded: false, count: 0 },
                              groups: { loaded: false, count: 0 },
                              lessons: { loaded: false, count: 0 },
                              activeReceivers: []
                            }
export default function (state = initialState, action) {
  switch (action.type) {
    case START_STUDENTS_FETCH:
      return {...state}
    case FINISH_STUDENTS_FETCH:
      return {...state, activePage: action.page, students: {loaded: true, count: action.count}}
    case START_TEACHERS_FETCH:
      return {...state}
    case FINISH_TEACHERS_FETCH:
      return {...state, activePage: action.page, teachers: {loaded: true, count: action.count}}
    case START_GROUPS_FETCH:
      return {...state}
    case FINISH_GROUPS_FETCH:
      return {...state, activePage: action.page, groups: {loaded: true, count: action.count}}
    case START_LESSONS_FETCH:
      return {...state}
    case FINISH_LESSONS_FETCH:
      return {...state, activePage: action.page, lessons: {loaded: true, count: action.count}}
    case CHANGE_ACTIVE_TAB:
      return {...state, activeTab: action.activeTab}
    case ADD_RECEIVER:
      return {...state, activeReceivers: [...state.activeReceivers, action.receiver]}
    case REMOVE_RECEIVER:
      return {...state, activeReceivers: [
                          ...state.activeReceivers.slice(0, action.receiverIndex), 
                          ...state.activeReceivers.slice(action.receiverIndex + 1)
                        ]}
    default:
      return state
  }
}

// Schemas
const group = new Schema('groups')
const lesson = new Schema('lessons')
const student = new Schema('students')
const teacher = new Schema('teachers')

group.define({
})

lesson.define({
})

student.define({
})

teacher.define({
})
