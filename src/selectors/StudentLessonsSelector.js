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

const getStudentLessonStudents = (state) => {
  return state.entities.students
}

const getStudentLessonTeachers = (state) => {
  return state.entities.teachers
}

const areEntitiesLoaded = (state) => {
  return state.lessons.loaded
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
  [getActiveLesson, getStudentLessonLessonDates, areEntitiesLoaded],
  (activeLesson, lessonDates, loaded) => {
    if(!loaded) {
      return []
    }
    let lessonDatesArray = []
    activeLesson.lessonDates.map((el) => {
      lessonDatesArray.push(lessonDates[el])
    })
    return lessonDatesArray
  }
)

export const activeLessonGradesArraySelector = createSelector(
  [getActiveLesson, getStudentGrades, areEntitiesLoaded],
  (activeLesson, grades, loaded) => {
    if(!loaded) {
      return []
    }
    let gradesArray = []
    activeLesson.studentGrades.map((id) => {
      gradesArray.push(grades[id])
    })
    return gradesArray
  }
)

export const activeLessonStudentsArraySelector = createSelector(
  [getActiveLesson, getStudentLessonStudents, areEntitiesLoaded],
  (activeLesson, students, loaded) => {
    if(!loaded) {
      return []
    }
    let studentArray = []
    activeLesson.students.map((id) => {
      studentArray.push(students[id])
    })
    return studentArray
  }
)

export const activeLessonTeachersArraySelector = createSelector(
  [getActiveLesson, getStudentLessonTeachers, areEntitiesLoaded],
  (activeLesson, teachers, loaded) => {
    if(!loaded) {
      return []
    }
    let teachersArray = []
    activeLesson.teachers.map((el) => {
      teachersArray.push(teachers[el])
    })
    return teachersArray
  }
)
