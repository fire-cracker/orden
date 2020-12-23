import db from '../database'

/**
 * @export
 * @function addOrder
 * @param {string} title - title of order
 * @param {Integer} bookingDate - order booking date
 * @param {Object} address - order address
 * @param {Object} customer - order author
 * @returns {Object} object
 */
export const addOrder = async(title, bookingDate, address, customer) => {
  const order = await db.collection('orders').add({
    title,
    bookingDate,
    address,
    customer
  })
  return order
}
