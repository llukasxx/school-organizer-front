import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import { reducer as form } from 'redux-form';
import {reducer as toastrReducer} from 'react-redux-toastr'
import AuthReducer from './modules/AuthReducer'
import GroupsReducer from './modules/GroupsReducer'
import MessagesReducer from './modules/MessagesReducer'
import ReceiversReducer from './modules/ReceiversReducer'

import merge from 'lodash/object/merge'

function entities(state = { groups: {}, 
  lessons: {}, lessonDates: {}, students: {}, 
  studentGrades: {}, messages: {}, conversations: {},
  receipts: {}, receivers: {}}, action) {
  if (action.response && action.response.entities) {
    return merge({}, state, action.response.entities)
  }
  return state
}

export default combineReducers({
  router,
  form,
  entities,
  toastr: toastrReducer,
  auth: AuthReducer,
  teacherGroups: GroupsReducer,
  messages: MessagesReducer,
  receivers: ReceiversReducer
})
