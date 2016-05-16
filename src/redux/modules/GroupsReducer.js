import axios from 'axios'
import { ROOT_URL } from '../ApiConfig'
import update from 'react/lib/update'

//normalizr
import { normalize, Schema, arrayOf } from 'normalizr'
import { camelizeKeys } from 'humps'

// Constants
// export const constants = { }
export const START_TEACHER_GROUPS_FETCH = 'school-organizer/groups/START_TEACHER_GROUPS_FETCH'
export const FETCH_TEACHER_GROUPS = 'school-organizer/groups/FETCH_TEACHER_GROUPS'
export const FETCH_TEACHER_GROUPS_ERROR = 'school-organizer/groups/FETCH_TEACHER_GROUPS_ERROR'
export const SET_ACTIVE_GROUP = 'school-organizer/groups/SET_ACTIVE_GROUP'

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
        dispatch({ type: SET_ACTIVE_GROUP, payload: response.data.groups[0]})

        const camelized = camelizeKeys(response.data)

        dispatch({ type: FETCH_TEACHER_GROUPS, 
                   payload: response.data.groups, 
                   response: normalize(camelized, { groups: arrayOf(group) })
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
        console.log(response.data)
        let camelized = camelizeKeys(response.data)
        dispatch({ type: FETCH_GRADE, response: normalize(camelized, { studentGrades: studentGrade })})
      })
      .catch(function(response) {
        console.log(response)
      })
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
    case FETCH_GRADE:
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
  student: student,
  lesson: lesson
})

lessonDates.define({
  lesson: lesson
})
