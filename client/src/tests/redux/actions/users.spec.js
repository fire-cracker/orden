import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import {
  setUserState,
  loginRequestPending,
  loginRequestSuccess,
  login,
  getUser
} from '../../../redux/actions/users'
import { user } from '../../_mocks_/users.mock'

import firebase from '../../../utils/firebaseConfig'

const createMockStore = configureMockStore([thunk])

jest.mock('../../../utils/firebaseConfig', () => jest.fn())
const mockSignInWithEmailAndPassword = jest
  .fn()
  .mockResolvedValueOnce('true')
  .mockRejectedValueOnce()
jest.mock('../../../utils/firebaseConfig', () => ({
  auth: () => ({ signInWithEmailAndPassword: mockSignInWithEmailAndPassword }),
  firestore: jest.fn(() => ({
    collection: jest.fn(() => ({
      add: jest.fn(() => Promise.resolve('Never mock firebase'))
    })),
    doc: jest.fn(() => ({
      set: jest.fn(),
      get: jest.fn(() => Promise.resolve({ data: jest.fn(() => Promise.resolve()) }))
    }))
  }))
}))

describe('Users actions', () => {
  const store = createMockStore({})

  describe('Users Login actions', () => {
    beforeEach(() => {
      store.clearActions()
    })

    it('Should get the initial state of the store', async () => {
      const store = createMockStore({})
      await store.dispatch(loginRequestPending())
      const [action] = store.getActions()
      expect(action).toEqual({
        type: 'LOGIN_REQUEST_PENDING'
      })
    })

    it('Should dispatch success when login is successful', async () => {
      const store = createMockStore({})
      await store.dispatch(loginRequestSuccess())
      const [action] = store.getActions()
      expect(action).toEqual({ type: 'LOGIN_REQUEST_SUCCESS' })
    })

    it('Should login when request is successful', async () => {
      firebase.auth.signInWithEmailAndPassword
      const { email, password } = user
      await store.dispatch(login(email, password))
      const expectedActions = [
        {
          type: 'LOGIN_REQUEST_PENDING'
        },
        {
          type: 'LOGIN_REQUEST_SUCCESS'
        }
      ]
      expect(store.getActions()).toEqual(expectedActions)
    })

    it('Should throw an error if login request fails', async () => {
      firebase.auth.signInWithEmailAndPassword
      const { email, password } = user
      await store.dispatch(login(email, password))
      const expectedActions = [
        {
          type: 'LOGIN_REQUEST_PENDING'
        },
        {
          type: 'LOGIN_REQUEST_FAILED'
        }
      ]
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  describe('Get User actions', () => {
    beforeEach(() => {
      store.clearActions()
    })

    it('Should dispatch set user state when page is mounted', async () => {
      const store = createMockStore({})
      await store.dispatch(setUserState(user))
      const [action] = store.getActions()
      expect(action).toEqual({
        type: 'SET_USER_STATE',
        payload: user
      })
    })

    it('Should get user details if request it successful', async () => {
      firebase.firestore
      await store.dispatch(getUser({ uid: 1 }))
      const expectedActions = [
        {
          type: 'SET_USER_STATE',
          payload: { uid: 1 }
        }
      ]
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})
