// Constants
// export const constants = { }
const START_AUTH = 'school-organizer/auth/START_AUTH'
const AUTH_FINISH = 'school-organizer/auth/AUTH_FINISH'
const AUTH_ERROR = 'school-organizer/auth/AUTH_ERROR'
// Action Creators
// export const actions = { }
export function signInUser({email, password}) {
  return function(dispatch) {
    dispatch({ type: START_AUTH })
    return function(dispatch) {
      dispatch({ 
        type: AUTH_FINISH, 
        payload: 'Login success!' 
      })
    }
  }
}

// Reducer
export const initialState = {}
export default function (state = initialState, action) {
  switch (action.type) {
    case START_AUTH:
      return { ...state, loading: true };
    case AUTH_FINISH:
      return { ...state, loginInfo: action.payload, loading: false };
    case AUTH_ERROR:
      return { ...state, loginInfo: action.payload, loading: false };
    default:
      return state
  }
}
