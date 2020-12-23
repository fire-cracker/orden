import db from '../database'

/**
 * @export
 * @function addOrder
 * @param {String} title - title of order
 * @param {Integer} bookingDate - order booking date
 * @param {Object} address - order address
 * @param {Object} customer - order author
 * @returns {Object} object
 */
export const addOrder = async (title, bookingDate, address, customer) => {
  return await db.collection('orders').add({
    title,
    bookingDate,
    address,
    customer
  })
}

/**
 * @export
 * @function updateOrder
 * @param {String} orderId - id of order
 * @param {String} title - title of order
 * @param {Integer} bookingDate - order booking date
 * @returns {Object} object
 */
export const updateOrder = async (orderId, title, bookingDate) => {
  return await db.collection('orders').doc(orderId).update({
    title,
    bookingDate
  })
}

/**
 * @export
 * @function getOrder
 * @param {String} orderId - id of order
 * @returns {Object} object
 */
export const getOrder = async (orderId) => {
  return (await db.collection('orders').doc(orderId).get()).data()
}
