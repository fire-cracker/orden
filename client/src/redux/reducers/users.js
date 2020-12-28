import { ActionType } from '../actionsTypes';

const {
  SET_USER_STATE,
  LOGIN_REQUEST_PENDING,
  LOGIN_REQUEST_SUCCESS,
  LOGIN_REQUEST_FAILED,
} = ActionType;

const initialState = {
  user: null,
  logingIn: false,
  isLoggedIn: false,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_STATE:
      return {
        ...state,
        user: action.payload,
        isLoggedIn: true,
      };

    case LOGIN_REQUEST_PENDING:
      return {
        ...state,
        logingIn: true,
      };

    case LOGIN_REQUEST_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        logingIn: false,
      };

    case LOGIN_REQUEST_FAILED:
      return {
        ...state,
        isLoggedIn: false,
        logingIn: false,
      };

    default:
      return state;
  }
};
