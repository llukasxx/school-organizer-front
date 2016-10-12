import axios from 'axios'
import {toastr} from 'react-redux-toastr'

import { ROOT_URL, authHeader, currentUserId } from '../ApiConfig'

import { UNAUTH_USER } from './AuthReducer'

import { normalize, Schema, arrayOf } from 'normalizr'
import { camelizeKeys } from 'humps'
// Constants
// export const constants = { }

export const START_STUDENT_LESSONS_FETCH =  'school-organizer/lessons/START_STUDENT_LESSONS_FETCH'
export const FINISH_STUDENT_LESSONS_FETCH =  'school-organizer/lessons/FINISH_STUDENT_LESSONS_FETCH'
export const SET_ACTIVE_LESSON = 'school-organizer/lessons/SET_ACTIVE_LESSON'
export const FETCH_STUDENT_LESSONS_ERROR =  'school-organizer/lessons/FETCH_STUDENT_LESSONS_ERROR'

// Action Creators
// export const actions = { }

export function fetchStudentLessons() {
  return function(dispatch) {
    dispatch({ type: START_STUDENT_LESSONS_FETCH })
    axios.get(`${ROOT_URL}/api/v1/students/${currentUserId}/lessons`, authHeader)
      .then(function(response) {
        const camelized = camelizeKeys(response.data)
        const normalizedResponse = normalize({studentLessons: camelized.lessons} , { studentLessons: arrayOf(studentLesson) })
        const firstLesson = Object.keys(normalizedResponse.entities.studentLessons)[0]
        if(firstLesson) {
          dispatch({ type: SET_ACTIVE_LESSON, activeLesson: normalizedResponse.entities.studentLessons[firstLesson]})
        }
        dispatch({ type: FINISH_STUDENT_LESSONS_FETCH,
                   response: normalizedResponse
                 })
      })
      .catch(function(response) {
        if(response.status == 401) {
          dispatch({ type: UNAUTH_USER })
          dispatch(push('/'))
        }
        dispatch({ type: FETCH_STUDENT_LESSONS_ERROR, payload: response.data})
        toastr.warning('Warning', 'Something bad happened')
      })

  }
}

export function changeActiveLesson(activeLesson) {
  return function(dispatch) {
    dispatch({type: SET_ACTIVE_LESSON, activeLesson})
  }
}

// Reducer
export const initialState = { 
  loaded: false
}
export default function (state = initialState, action) {
  switch (action.type) {
    case START_STUDENT_LESSONS_FETCH:
      return { ...state, loaded: false }
    case FINISH_STUDENT_LESSONS_FETCH:
      return { ...state, loaded: true }
    case SET_ACTIVE_LESSON:
      return {...state, activeLesson: action.activeLesson}
    default:
      return state
  }
}

const studentLesson = new Schema('studentLessons')
const studentGrade = new Schema('studentGrades')
const lessonDate = new Schema('lessonDates')

studentLesson.define({
  studentGrades: arrayOf(studentGrade),
  lessonDates: arrayOf(lessonDate)
})

studentGrade.define({

})

lessonDate.define({
  
})
