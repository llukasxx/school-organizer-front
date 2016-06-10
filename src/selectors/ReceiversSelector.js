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

const getActiveReceiversStudentsIds = (state) => {
  const { activeReceivers } = state.receivers
  let studentIds = []
  activeReceivers.map((el) => {
    if(el.type == 'student') {
      studentIds.push(el.id)
    }
  })
  return studentIds
}

const getActiveReceiversTeachersIds = (state) => {
  const { activeReceivers } = state.receivers
  let teachersIds = []
  activeReceivers.map((el) => {
    if(el.type == 'teacher') {
      teachersIds.push(el.id)
    }
  })
  return teachersIds
}

const getActiveReceiversGroupsIds = (state) => {
  const { activeReceivers } = state.receivers
  let groupsIds = []
  activeReceivers.map((el) => {
    if(el.type == 'group') {
      groupsIds.push(el.id)
    }
  })
  return groupsIds
}

const getActiveReceiversLessonsIds = (state) => {
  const { activeReceivers } = state.receivers
  let lessonsIds = []
  activeReceivers.map((el) => {
    if(el.type == 'lesson') {
      lessonsIds.push(el.id)
    }
  })
  return lessonsIds
}


export const studentsArraySelector = createSelector(
  [getAllStudents, getActiveReceiversStudentsIds],
  (students, activeReceivers) => {
    let studentsArray = []
    Object.keys(students).map((id) => {
      if(!(activeReceivers.includes(parseInt(id)))) {
        studentsArray.push(students[id])
      }
    })
    return studentsArray
  }
)

export const teachersArraySelector = createSelector(
  [getAllTeachers, getActiveReceiversTeachersIds],
  (teachers, activeReceivers) => {
    let teachersArray = []
    Object.keys(teachers).map((id) => {
      if(!(activeReceivers.includes(parseInt(id)))) {
        teachersArray.push(teachers[id])
      }
    })
    return teachersArray
  }
)

export const groupsArraySelector = createSelector(
  [getAllGroups, getActiveReceiversGroupsIds],
  (groups, activeReceivers) => {
    let groupsArray = []
    Object.keys(groups).map((id) => {
      if(!(activeReceivers.includes(parseInt(id)))) {
        groupsArray.push(groups[id])
      }
    })
    return groupsArray
  }
)

export const lessonsArraySelector = createSelector(
  [getAllLessons, getActiveReceiversLessonsIds],
  (lessons, activeReceivers) => {
    let lessonsArray = []
    Object.keys(lessons).map((id) => {
      if(!(activeReceivers.includes(parseInt(id)))) {
        lessonsArray.push(lessons[id])
      }
    })
    return lessonsArray
  }
)

export const activeReceiversArraySelector = createSelector(
  [getActiveReceivers],
  receivers => receivers
)