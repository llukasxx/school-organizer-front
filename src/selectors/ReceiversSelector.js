import { createSelector } from 'reselect'

const getAllStudents = (state) => {
  return state.paginatedEntities.students
}

const getAllTeachers = (state) => {
  return state.paginatedEntities.teachers
}


export const studentsArraySelector = createSelector(
  [getAllStudents],
  (students) => {
    let studentsArray = []
    Object.keys(students).map((id) => {
      studentsArray.push(students[id])
    })
    return studentsArray
  }
)

export const teachersArraySelector = createSelector(
  [getAllTeachers],
  (teachers) => {
    let teachersArray = []
    Object.keys(teachers).map((id) => {
      teachersArray.push(teachers[id])
    })
    return teachersArray
  }
)