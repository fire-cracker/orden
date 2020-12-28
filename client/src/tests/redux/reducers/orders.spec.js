import ordersReducer from '../../../redux/reducers/orders';
import { ActionType } from '../../../redux/actionsTypes';
import { order, orders } from '../../_mocks_/orders.mock';

const initialState = {
  orders: null,
  order: null,
  length: 0,
  success: false,
  fetching: false,
  updating: false,
};

it('Should return default state', () => {
  const state = ordersReducer(undefined, {
    type: '@@INIT',
  });

  expect(state).toEqual(initialState);
});

describe('GET_ORDERS', () => {
  it('Should handle GET_ORDERS_REQUEST_PENDING', () => {
    const state = ordersReducer(initialState, {
      type: ActionType.GET_ORDERS_REQUEST_PENDING,
    });
    expect(state).toEqual({ ...initialState, fetching: true });
  });

  it('Should handle GET_ORDERS_REQUEST_SUCCESS', () => {
    const state = ordersReducer(initialState, {
      type: ActionType.GET_ORDERS_REQUEST_SUCCESS,
      payload: orders,
    });
    expect(state).toEqual({ ...initialState, orders, success: true });
  });

  it('Should handle GET_ORDERS_REQUEST_FAILED', () => {
    const state = ordersReducer(initialState, {
      type: ActionType.GET_ORDERS_REQUEST_FAILED,
    });
    expect(state).toEqual({ ...initialState, fetching: false });
  });
});

describe('GET_ORDER', () => {
  it('Should handle GET_ORDER_REQUEST_PENDING', () => {
    const state = ordersReducer(initialState, {
      type: ActionType.GET_ORDER_REQUEST_PENDING,
    });
    expect(state).toEqual({ ...initialState, fetching: true });
  });

  it('Should handle GET_ORDER_REQUEST_SUCCESS', () => {
    const state = ordersReducer(initialState, {
      type: ActionType.GET_ORDER_REQUEST_SUCCESS,
      payload: order,
    });
    expect(state).toEqual({ ...initialState, order, success: true });
  });

  it('Should handle GET_ORDER_REQUEST_FAILED', () => {
    const state = ordersReducer(initialState, {
      type: ActionType.GET_ORDER_REQUEST_FAILED,
    });
    expect(state).toEqual({ ...initialState, fetching: false });
  });
});

describe('UPDATE_ORDER', () => {
  it('Should handle UPDATE_ORDER_REQUEST_PENDING', () => {
    const state = ordersReducer(initialState, {
      type: ActionType.UPDATE_ORDER_REQUEST_PENDING,
    });
    expect(state).toEqual({ ...initialState, updating: true });
  });

  it('Should handle UPDATE_ORDER_REQUEST_SUCCESS', () => {
    const state = ordersReducer(initialState, {
      type: ActionType.UPDATE_ORDER_REQUEST_SUCCESS,
    });
    expect(state).toEqual({ ...initialState, success: true });
  });

  it('Should handle UPDATE_ORDER_REQUEST_FAILED', () => {
    const state = ordersReducer(initialState, {
      type: ActionType.UPDATE_ORDER_REQUEST_FAILED,
    });
    expect(state).toEqual({ ...initialState, updating: false });
  });
});
