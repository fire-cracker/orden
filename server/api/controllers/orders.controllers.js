import {
  addOrder
} from '../services/orders.service'

/**
 * @export
 * @function createOrder
 * @param {Object} req - request received
 * @param {Object} res - response object
 * @returns {Object} JSON object (JSend format)
 */
export const createOrder = async (req, res) => {
  try {
    const { title, bookingDate, address, customer } = req.body
    const order = await addOrder(title, bookingDate, address, customer)

    return res.status(200).send({
      status: 'success',
      order: {
        id: order.id
      }
    })

  } catch (error) {
    return res.status(502).send({
      status: 'fail',
      message: 'An error occurred'
    })
  }
}
