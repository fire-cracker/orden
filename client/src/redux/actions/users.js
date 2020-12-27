import { toast } from 'react-toastify'

import firebase from '../../utils/firebaseConfig'
import { ActionType } from '../actionsTypes'

const firestore = firebase.firestore()
const {
  LOGIN_REQUEST_PENDING,
  LOGIN_REQUEST_SUCCESS,
  LOGIN_REQUEST_FAILED,
  SET_USER_STATE,
} = ActionType

export const setUserState = (data) => ({
  type: SET_USER_STATE,
  payload: data
})

export const loginRequestPending = () => ({
  type: LOGIN_REQUEST_PENDING
})

export const loginRequestSuccess = () => ({
  type: LOGIN_REQUEST_SUCCESS
})

export const loginRequestFailed = () => ({
  type: LOGIN_REQUEST_FAILED
})

export const login = (email, password) => async (
  dispatch
)=> {
  try {
    dispatch(loginRequestPending())
    await firebase.auth().signInWithEmailAndPassword(email, password)
    dispatch(loginRequestSuccess())
    return;
  } catch (error) {
    dispatch(loginRequestFailed())
    toast.error('wrong credentials, please try again')
    return error
  }
}

export const getUser = (userDetails) => async(dispatch) => {
  try{
    const { uid } = userDetails
    const userDocument = await firestore.doc(`users/${uid}`).get();

    const user = {
      uid,
      ...userDocument.data()
    };
    dispatch(setUserState(user))
    return user
  }catch(error) {
    toast.error('User not found')
    return error
  }
};