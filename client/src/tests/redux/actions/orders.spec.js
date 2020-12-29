import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
  getOrdersRequestPending,
  getOrdersRequestSuccess,
  getOrders,
  getOrderRequestSuccess,
  getOrder,
  updateOrderRequestSuccess,
} from '../../../redux/actions/orders';
import { orders } from '../../_mocks_/orders.mock';

const createMockStore = configureMockStore([thunk]);

jest.mock('../../../utils/firebaseConfig', () => jest.fn());
const mockGetOrders = jest
  .fn()
  .mockResolvedValueOnce([{ id: '2', data: jest.fn() }])
  .mockRejectedValueOnce({ message: 'fail' });

const mockGetOrder = jest
  .fn()
  .mockResolvedValueOnce({
    exists: true,
    id: '2',
    data: jest.fn(() => Promise.resolve()),
  })
  .mockRejectedValueOnce({ message: 'fail' });

jest.mock('../../../utils/firebaseConfig', () => ({
  firestore: jest.fn(() => ({
    collection: jest.fn(() => ({
      get: mockGetOrders,
      doc: jest.fn(() => ({
        get: mockGetOrder,
      }))
    }))
  }))
}));

describe('Users actions', () => {
  const store = createMockStore({});

  describe('Get Orders actions', () => {
    beforeEach(() => {
      store.clearActions();
    });

    it('Should get the initial state of the store', async () => {
      await store.dispatch(getOrdersRequestPending());
      const [action] = store.getActions();
      expect(action).toEqual({
        type: 'GET_ORDERS_REQUEST_PENDING',
      });
    });

    it('Should dispatch success when request to get orders is successful', async () => {
      await store.dispatch(getOrdersRequestSuccess(orders));
      const [action] = store.getActions();
      expect(action).toEqual({
        type: 'GET_ORDERS_REQUEST_SUCCESS',
        payload: orders,
      });
    });

    it('Should get orders if request is successful', async () => {
      await store.dispatch(getOrders());
      const expectedActions = [
        {
          type: 'GET_ORDERS_REQUEST_PENDING',
        },
        {
          type: 'GET_ORDERS_REQUEST_SUCCESS',
          payload: [{ id: '2' }],
        },
      ];
      expect(store.getActions()).toEqual(expectedActions);
    });

    it('Should return error if request unsuccessful', async () => {
      await store.dispatch(getOrders());
      const expectedActions = [
        {
          type: 'GET_ORDERS_REQUEST_PENDING',
        },
        {
          type: 'GET_ORDERS_REQUEST_FAILED',
        },
      ];
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  describe('Get Order actions', () => {
    beforeEach(() => {
      store.clearActions();
    });

    it('Should dispatch success when request to get order is successful', async () => {
      await store.dispatch(getOrderRequestSuccess(orders));
      const [action] = store.getActions();
      expect(action).toEqual({
        type: 'GET_ORDER_REQUEST_SUCCESS',
        payload: orders,
      });
    });

    it('Should get order if request is successful', async () => {
      await store.dispatch(getOrder());
      const expectedActions = [
        {
          type: 'GET_ORDER_REQUEST_PENDING',
        },
        {
          type: 'GET_ORDER_REQUEST_SUCCESS',
          payload: { id: '2' },
        },
      ];
      expect(store.getActions()).toEqual(expectedActions);
    });

    it('Should dispatch error if request to get order is unsuccessful', async () => {
      await store.dispatch(getOrder());
      const expectedActions = [
        {
          type: 'GET_ORDER_REQUEST_PENDING',
        },
        {
          type: 'GET_ORDER_REQUEST_FAILED',
        },
      ];
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  describe('Update Order actions', () => {
    beforeEach(() => {
      store.clearActions();
    });

    it('Should dispatch success when request to update order is successful', async () => {
      await store.dispatch(updateOrderRequestSuccess(orders));
      const [action] = store.getActions();
      expect(action).toEqual({
        type: 'UPDATE_ORDER_REQUEST_SUCCESS',
      });
    });
  });
});
