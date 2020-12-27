import { toast } from 'react-toastify'

import firebase from '../../utils/firebaseConfig'
import { ActionType } from '../actionsTypes'

const db = firebase.firestore()
const {
  GET_ORDERS_REQUEST_PENDING,
  GET_ORDERS_REQUEST_SUCCESS,
  GET_ORDERS_REQUEST_FAILED,
  GET_ORDER_REQUEST_PENDING,
  GET_ORDER_REQUEST_SUCCESS,
  GET_ORDER_REQUEST_FAILED,
  UPDATE_ORDER_REQUEST_PENDING,
  UPDATE_ORDER_REQUEST_SUCCESS,
  UPDATE_ORDER_REQUEST_FAILED
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

export const getOrderRequestPending = () => ({
  type: GET_ORDER_REQUEST_PENDING
})

export const getOrderRequestSuccess = (data) => ({
  type: GET_ORDER_REQUEST_SUCCESS,
  payload: data
})

export const getOrderRequestFailed = () => ({
  type: GET_ORDER_REQUEST_FAILED
})

export const updateOrderRequestPending = () => ({
  type: UPDATE_ORDER_REQUEST_PENDING
})

export const updateOrderRequestSuccess = () => ({
  type: UPDATE_ORDER_REQUEST_SUCCESS
})

export const updateOrderRequestFailed = () => ({
  type: UPDATE_ORDER_REQUEST_FAILED
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

export const getOrder = (orderId) => async (dispatch) => {
  try {
    dispatch(getOrderRequestPending())
    const doc = await db.collection('orders').doc(orderId).get()
    if(!doc.exists) throw new Error('User not found');
    const order = {
      id: doc.id,
      ...doc.data()
    }

    dispatch(getOrderRequestSuccess(order))
    return order
  } catch (error) {
    dispatch(getOrderRequestFailed())
    toast.error(error.message)
    return error
  }
}

export const updateOrder = (order) => async (dispatch) => {
  try {
    const { id, title, bookingDate} = order
    dispatch(updateOrderRequestPending())
    const response = await fetch(`http://localhost:8080/orders/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ title, bookingDate }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const result = await response.json()
    dispatch(updateOrderRequestSuccess())
    toast.info(result.status)
    return result
  } catch (error) {
    dispatch(updateOrderRequestFailed())
    toast.error(error.message)
    return error
  }
}
