import { createSelector } from 'reselect'

const getAllStudents = (state) => {
  return state.paginatedEntities.students
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