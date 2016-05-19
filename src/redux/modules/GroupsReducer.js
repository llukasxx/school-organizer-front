import axios from 'axios'
import { ROOT_URL } from '../ApiConfig'

import {toastr} from 'react-redux-toastr'

//normalizr
import { normalize, Schema, arrayOf } from 'normalizr'
import { camelizeKeys } from 'humps'

// Constants
// export const constants = { }
export const START_TEACHER_GROUPS_FETCH = 'school-organizer/groups/START_TEACHER_GROUPS_FETCH'
export const FETCH_TEACHER_GROUPS = 'school-organizer/groups/FETCH_TEACHER_GROUPS'
export const FETCH_TEACHER_GROUPS_ERROR = 'school-organizer/groups/FETCH_TEACHER_GROUPS_ERROR'
export const SET_ACTIVE_GROUP = 'school-organizer/groups/SET_ACTIVE_GROUP'
export const ADD_GRADE = 'school-organizer/groups/ADD_GRADE'
// Grades actions
export const FETCH_GRADE = 'school-organizer/groups/FETCH_GRADE'


// Action Creators
// GROUPS
export function fetchTeacherGroups() {
  return function(dispatch) {
    dispatch({ type: START_TEACHER_GROUPS_FETCH})
    axios.get(`${ROOT_URL}/api/v1/groups/teacher_groups`, { 
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(function(response) {
        console.log(response)
        const camelized = camelizeKeys(response.data)
        const normalizedResponse = normalize(camelized, { groups: arrayOf(group) })
        const firstGroup = Object.keys(normalizedResponse.entities.groups)[0]
        if(firstGroup) {
          dispatch({ type: SET_ACTIVE_GROUP, payload: normalizedResponse.entities.groups[firstGroup]})
        }
        dispatch({ type: FETCH_TEACHER_GROUPS,
                   response: normalizedResponse
                 })
      })
      .catch(function(response) {
        console.log(response)
        dispatch({ type: FETCH_TEACHER_GROUPS_ERROR, payload: response.data})
      })
  }
}

export function setActiveGroup(group) {
  return function(dispatch) {
    dispatch({ type: SET_ACTIVE_GROUP, payload: group})
  }
}

//GRADES
export function sendGrade(newGrade) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/api/v1/students/grades`, {grade: newGrade}, {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(function(response) {
        let camelized = camelizeKeys(response.data)
        let normalized = normalize(camelized, { 
          student: student
        })
        dispatch({ type: FETCH_GRADE, response: normalized})
        dispatch({ type: ADD_GRADE, grade: normalized})
        toastr.success('Grade', 'Has been successfully added.')
      })
      .catch(function(response) {
        console.log(response)
        toastr.warning('Warning', 'Something bad happened.')
      })
  }
}


// Reducer
export const initialState = {}
export default function (state = initialState, action) {
  switch (action.type) {
    case START_TEACHER_GROUPS_FETCH:
      return { ...state, loaded: false}
    case FETCH_TEACHER_GROUPS:
      return {...state, loaded: true}
    case FETCH_TEACHER_GROUPS_ERROR:
      return {...state, loaded: true}
    case SET_ACTIVE_GROUP:
      return {...state, activeGroup: action.payload, loaded: true}
    case ADD_GRADE:
      return {...state}
    default:
      return state
  }
}


// Schemas
const group = new Schema('groups')
const lesson = new Schema('lessons')
const student = new Schema('students')
const studentGrade = new Schema('studentGrades')
const lessonDates = new Schema('lessonDates')

group.define({
  lessons: arrayOf(lesson)
})

lesson.define({
  students: arrayOf(student),
  lessonDates: arrayOf(lessonDates)
})

student.define({
  studentGrades: arrayOf(studentGrade),
  lesson: lesson
})

studentGrade.define({
})

lessonDates.define({
})
