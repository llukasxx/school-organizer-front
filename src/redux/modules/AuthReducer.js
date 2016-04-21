// Constants
// export const constants = { }
export const AUTH_ERROR = 'AUTH_ERROR'
// Action Creators
// export const actions = { }
export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}
// Reducer
export const initialState = {}
export default function (state = initialState, action) {
  switch (action.type) {
    case AUTH_ERROR:
      return { ...state, error: action.payload };
    default:
      return state
  }
}
