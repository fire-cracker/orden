import { toast } from 'react-toastify'

import firebase from '../../utils/firebaseConfig'
import { ActionType } from '../actionsTypes'

const db = firebase.firestore()
const {
  GET_ORDERS_REQUEST_PENDING,
  GET_ORDERS_REQUEST_SUCCESS,
  GET_ORDERS_REQUEST_FAILED
} = ActionType

export const getOrdersRequestPending = () => ({
  type: GET_ORDERS_REQUEST_PENDING
})

export const getOrdersRequestSuccess = (data) => ({
  type: GET_ORDERS_REQUEST_SUCCESS,
  payload: data
})

export const getOrdersRequestFailed = () => ({
  type: GET_ORDERS_REQUEST_FAILED
})

export const getOrders = () => async (dispatch) => {
  try {
    dispatch(getOrdersRequestPending())
    const orderQuerySnapshot = await db.collection('orders').get()
    const orders = []
    orderQuerySnapshot.forEach((doc) => {
      orders.push({
        id: doc.id,
        ...doc.data()
      })
    })
    dispatch(getOrdersRequestSuccess(orders))
    return orders
  } catch (error) {
    dispatch(getOrdersRequestFailed())
    toast.error(error.message)
    return error
  }
}
