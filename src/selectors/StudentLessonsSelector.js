import { createSelector } from 'reselect'

const getStudentLessons = (state) => {
  return state.entities.studentLessons
}

const getStudentLessonGrades = (state, ownProps) => {
  return state.entities.studentGrades
}

export const allStudentLessonsArraySelector = createSelector(
  [getStudentLessons],
  (studentLessons) => {
    let lessonsArray = []
    Object.keys(studentLessons).map((id) => {
      lessonsArray.push(studentLessons[id])
    })
    return lessonsArray
  }
)