import { ActionType } from '../actionsTypes'

const {
  LOGIN_REQUEST_PENDING,
  LOGIN_REQUEST_SUCCESS,
  LOGIN_REQUEST_FAILED
} = ActionType

const initialState = {
  user: null,
  logingIn: false,
  isLoggedIn: false
}
export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST_PENDING:
      return {
        ...state,
        logingIn: true
      }

    case LOGIN_REQUEST_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isLoggedIn: true,
        logingIn: false
      }

    case LOGIN_REQUEST_FAILED:
      return {
        ...state,
        isLoggedIn: false,
        logingIn: false
      }

    default:
      return state
  }
}
