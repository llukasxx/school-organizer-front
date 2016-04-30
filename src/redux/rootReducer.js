import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import { reducer as form } from 'redux-form';
import AuthReducer from './modules/AuthReducer'
import GroupsReducer from './modules/GroupsReducer'

export default combineReducers({
  router,
  form,
  auth: AuthReducer,
  teacherGroups: GroupsReducer
})
