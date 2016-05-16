import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import { reducer as form } from 'redux-form';
import AuthReducer from './modules/AuthReducer'
import GroupsReducer from './modules/GroupsReducer'

import merge from 'lodash/object/merge'

function entities(state = { groups: {}, lessons: {}, lessonDates: {}, students: {}, studentGrades: {} }, action) {
  if (action.response && action.response.entities) {
    return merge({}, state, action.response.entities)
  }
  return state
}

export default combineReducers({
  router,
  form,
  entities,
  auth: AuthReducer,
  teacherGroups: GroupsReducer
})
