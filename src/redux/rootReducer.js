import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import { reducer as form } from 'redux-form';
import {reducer as toastrReducer} from 'react-redux-toastr'
import AuthReducer from './modules/AuthReducer'
import GroupsReducer from './modules/GroupsReducer'
import MessagesReducer from './modules/MessagesReducer'
import ReceiversReducer from './modules/ReceiversReducer'
import EventsReducer from './modules/EventsReducer'
import LessonsReducer from './modules/LessonsReducer'

import merge from 'lodash/object/merge'

const initialState = { groups: {}, simpleGroups: {}, lessons: {}, lessonDates: {}, students: {},
                       studentGrades: {}, messages: {}, conversations: {},
                       receipts: {}, receivers: {}, studentLessons: {}}

function entities(state = initialState, action) {
  if (action.response && action.response.entities && !action.paginated) {
    return merge({}, state, action.response.entities)
  }
  return state
}

const initialPaginatedState = { students: {}, 
                                teachers: {}, 
                                groups: {}, 
                                lessons: {},
                                events: {}
                              }
// Resetting whole state just to keep paginated values
function paginatedEntities(state = initialPaginatedState, action) {
  if (action.response && action.response.entities && action.paginated) {
    return merge({}, initialPaginatedState, action.response.entities)
  }
  return state
}

export default combineReducers({
  router,
  form,
  entities,
  paginatedEntities,
  toastr: toastrReducer,
  auth: AuthReducer,
  teacherGroups: GroupsReducer,
  messages: MessagesReducer,
  receivers: ReceiversReducer,
  events: EventsReducer,
  lessons: LessonsReducer
})
