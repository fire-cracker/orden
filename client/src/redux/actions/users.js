import { toast } from 'react-toastify'

import firebase from '../../utils/firebaseConfig'
import { ActionType } from '../actionsTypes'

const {
  LOGIN_REQUEST_PENDING,
  LOGIN_REQUEST_SUCCESS,
  LOGIN_REQUEST_FAILED,
  SET_USER_STATE,
} = ActionType

export const setLoggedInState = (data) => ({
  type: SET_USER_STATE,
  payload: data
})

export const loginRequestPending = () => ({
  type: LOGIN_REQUEST_PENDING
})

export const loginRequestSuccess = (data) => ({
  type: LOGIN_REQUEST_SUCCESS,
  payload: data
})

export const loginRequestFailed = () => ({
  type: LOGIN_REQUEST_FAILED
})

export const login = (email, password) => async (
  dispatch
)=> {
  try {
    dispatch(loginRequestPending())
   const data = await firebase.auth().signInWithEmailAndPassword(email, password)
    console.log('data>>>>>>', data)
    // dispatch(loginRequestSuccess(user))
    return data
  } catch (error) {
    console.log('error>>>>>', error)
    dispatch(loginRequestFailed())
    toast.error('wrong credentials, please try again')
    return error
  }
}
