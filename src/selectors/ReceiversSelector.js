import { createSelector } from 'reselect'

const getAllStudents = (state) => {
  return state.paginatedEntities.students
}

const getAllTeachers = (state) => {
  return state.paginatedEntities.teachers
}

const getAllGroups = (state) => {
  return state.paginatedEntities.groups
}

const getAllLessons = (state) => {
  return state.paginatedEntities.lessons
}

const getActiveReceivers = (state) => {
  return state.receivers.activeReceivers
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

export const groupsArraySelector = createSelector(
  [getAllGroups],
  (groups) => {
    let groupsArray = []
    Object.keys(groups).map((id) => {
      groupsArray.push(groups[id])
    })
    return groupsArray
  }
)

export const lessonsArraySelector = createSelector(
  [getAllLessons],
  (lessons) => {
    let lessonsArray = []
    Object.keys(lessons).map((id) => {
      lessonsArray.push(lessons[id])
    })
    return lessonsArray
  }
)

export const activeReceiversArraySelector = createSelector(
  [getActiveReceivers],
  receivers => receivers
)