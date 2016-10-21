import { createSelector } from 'reselect'

const getStudentLessons = (state) => {
  return state.entities.studentLessons
}

const getStudentGrades = (state, ownProps) => {
  return state.entities.studentGrades
}

const getActiveLesson = (state) => {
  const { activeLesson } = state.lessons
  return activeLesson
}

const getStudentLessonLessonDates = (state) => {
  return state.entities.lessonDates
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

export const activeLessonLessonDatesArraySelector = createSelector(
  [getActiveLesson, getStudentLessonLessonDates],
  (activeLesson, lessonDates) => {
    let lessonDatesArray = []
    if(activeLesson !== undefined 
        && activeLesson.lessonDates.length > 0
        && Object.keys(lessonDates).length > 0) {
      activeLesson.lessonDates.map((el) => {
        lessonDatesArray.push(lessonDates[el])
      })
    }
    return lessonDatesArray
  }
)

export const activeLessonGradesArraySelector = createSelector(
  [getActiveLesson, getStudentGrades],
  (activeLesson, grades) => {
    let gradesArray = []
    Object.keys(grades).map((el) => {
      if(grades[el].lessonId == activeLesson.id) {
        gradesArray.push(grades[el])
      }
    })
    return gradesArray
  }
)