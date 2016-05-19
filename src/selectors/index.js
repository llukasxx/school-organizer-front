import { createSelector } from 'reselect'

const getGroups = (state) => state.entities.groups
const getLessonsById = (state, props) => { 
  let lessons = []
  if(props.lessons.length > 0) {
    props.lessons.map(function(id) {
      lessons.push(state.entities.lessons[id])
    })
  }
  return lessons
}
const getStudentsById = (state, props) => {
  let students = []
  const studentsIds = props.lesson.students
  if(studentsIds.length > 0) {
    studentsIds.map((id) => {
      students.push(state.entities.students[id])
    })
  }
  return students
}
const getLessonsDatesById = (state, props) => {
  let dates = []
  const datesIds = props.lesson.lessonDates
  if(datesIds.length > 0) {
    datesIds.map((id) => {
      dates.push(state.entities.lessonDates[id])
    })
  }
  return dates
}
const getStudentLessonGradesId = (state, props) => {
  const gradesIds = props.student.studentGrades
  return gradesIds
}
const getAllGrades = (state) => {
  return state.entities.studentGrades
}

export const groupsArraySelector = createSelector(
  [getGroups],
  groups => Object.keys(groups).map(id => groups[id])
)

export const activeLessonsArraySelector = createSelector(
  [getLessonsById],
  lessons => lessons
)

export const lessonStudentsArraySelector = createSelector(
  [getStudentsById],
  students => students
)

export const lessonDatesArraySelector = createSelector(
  [getLessonsDatesById],
  lessonDates => lessonDates
)

export const studentLessonGradesArraySelector = () => {
  return createSelector(
    [getStudentLessonGradesId, getAllGrades],
    (gradesIds, grades) => {
      let gradesArray = []
      if(gradesIds.length > 0) {
        gradesIds.map((id) => {
          gradesArray.push(grades[id])
        })
      }
      return gradesArray
    }
  )
}