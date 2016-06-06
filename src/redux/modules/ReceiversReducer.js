import axios from 'axios'
import { ROOT_URL } from '../ApiConfig'
import {toastr} from 'react-redux-toastr'
import { normalize, Schema, arrayOf } from 'normalizr'
import { camelizeKeys } from 'humps'

// Constants
// export const constants = { }
export const START_STUDENTS_FETCH = 'school-organizer/receivers/START_STUDENTS_FETCH'
export const FINISH_STUDENTS_FETCH = 'school-organizer/receivers/FINISH_STUDENTS_FETCH'
export const PAGINATED_ENTITIES = 'school-organizer/receivers/PAGINATED_ENTITIES'

// Action Creators
// export const actions = { }
export const getPaginatedStudents = (page = 1) => {
  return function(dispatch) {
    dispatch({type: START_STUDENTS_FETCH})
    axios.get(`${ROOT_URL}/api/v1/students/get_students`, { 
      headers: { authorization: localStorage.getItem('token') },
      params: {page: page}
    })
      .then(function(response) {
        let camelized = camelizeKeys(response.data)
        let normalized = normalize(camelized, { 
          students: arrayOf(student)
        })
        console.log(response)
        dispatch({type: FINISH_STUDENTS_FETCH, 
                  paginated: true,
                  response: normalized, 
                  count: response.data.count, 
                  activeTab: 'students',
                  page: page
                })
      })
      .catch(function(response) {
        toastr.warning('Warning', 'Something bad happened')
      })
  }
}

export const getAllTeachers = () => {
  return function(dispatch) {
    axios.get(`${ROOT_URL}/api/v1/users/get_teachers`, { 
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(function(response) {
        let camelized = camelizeKeys(response.data)
        let normalized = normalize(camelized, { 
          teachers: arrayOf(teacher)
        })
        dispatch({ response: normalized })
      })
      .catch(function(response) {
        toastr.warning('Warning', 'Something bad happened')
      })
  }
}

export const getAllGroups = () => {
  return function(dispatch) {
    axios.get(`${ROOT_URL}/api/v1/groups/get_groups`, { 
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(function(response) {
        let camelized = camelizeKeys(response.data)
        let normalized = normalize(camelized, { 
          groups: arrayOf(groups)
        })
        dispatch({ response: normalized })
      })
      .catch(function(response) {
        toastr.warning('Warning', 'Something bad happened')
      })
  }
}

export const getAllLessons = () => {
  return function(dispatch) {
    axios.get(`${ROOT_URL}/api/v1/lessons/get_lessons`, { 
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(function(response) {
        let camelized = camelizeKeys(response.data)
        let normalized = normalize(camelized, { 
          lessons: arrayOf(lesson)
        })
        dispatch({ response: normalized })
      })
      .catch(function(response) {
        toastr.warning('Warning', 'Something bad happened')
      })
  }
}

// Reducer
export const initialState = { activeTab: 'students', 
                              students: { loaded: false, count: 0, page: 1 },
                              teachers: { loaded: false, count: 0, page: 1 },
                              groups: { loaded: false, count: 0, page: 1 }
                            }
export default function (state = initialState, action) {
  switch (action.type) {
    case START_STUDENTS_FETCH:
      return {...state}
    case FINISH_STUDENTS_FETCH:
      return {...state, 
              activeTab: action.activeTab, 
              students: {loaded: true, count: action.count, page: action.page}}
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