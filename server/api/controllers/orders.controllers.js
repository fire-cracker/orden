import {
  addOrder,
  updateOrder,
  getOrder
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
    return res.status(500).send({
      status: 'fail',
      message: 'An error occurred'
    })
  }
}

/**
 * @export
 * @function updateOrder
 * @param {Object} req - request received
 * @param {Object} res - response object
 * @returns {Object} JSON object (JSend format)
 */
export const patchOrder = async (req, res) => {
  try {
    const { body: { title, bookingDate }, params: { orderId } } = req
    const foundOrder = await getOrder(orderId)
  
    if(!foundOrder) {
      return res.status(404).send({
        status: 'fail',
        message: 'Order not found'
      })
    }
    await updateOrder(orderId, title, bookingDate)
    
    return res.status(200).send({
      status: 'success'
    })

  } catch (error) {
    return res.status(500).send({
      status: 'fail',
      message: 'An error occurred'
    })
  }
}
