import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import { reducer as form } from 'redux-form';
import AuthReducer from './modules/AuthReducer'

export default combineReducers({
  router,
  form,
  auth: AuthReducer
})
