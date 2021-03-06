import { ActionType } from '../actionsTypes';

const {
  GET_ORDERS_REQUEST_PENDING,
  GET_ORDERS_REQUEST_SUCCESS,
  GET_ORDERS_REQUEST_FAILED,
  GET_ORDER_REQUEST_PENDING,
  GET_ORDER_REQUEST_SUCCESS,
  GET_ORDER_REQUEST_FAILED,
  UPDATE_ORDER_REQUEST_PENDING,
  UPDATE_ORDER_REQUEST_SUCCESS,
  UPDATE_ORDER_REQUEST_FAILED,
} = ActionType;

const initialState = {
  orders: null,
  order: null,
  length: 0,
  success: false,
  fetching: false,
  updating: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDERS_REQUEST_PENDING:
      return {
        ...state,
        fetching: true,
      };

    case GET_ORDERS_REQUEST_SUCCESS:
      return {
        ...state,
        orders: action.payload,
        success: true,
        fetching: false,
      };

    case GET_ORDERS_REQUEST_FAILED:
      return {
        ...state,
        success: false,
        fetching: false,
      };

    case GET_ORDER_REQUEST_PENDING:
      return {
        ...state,
        fetching: true,
      };

    case GET_ORDER_REQUEST_SUCCESS:
      return {
        ...state,
        order: action.payload,
        success: true,
        fetching: false,
      };

    case GET_ORDER_REQUEST_FAILED:
      return {
        ...state,
        success: false,
        fetching: false,
      };

    case UPDATE_ORDER_REQUEST_PENDING:
      return {
        ...state,
        updating: true,
      };

    case UPDATE_ORDER_REQUEST_SUCCESS:
      return {
        ...state,
        success: true,
        updating: false,
      };

    case UPDATE_ORDER_REQUEST_FAILED:
      return {
        ...state,
        success: false,
        updating: false,
      };

    default:
      return state;
  }
};
