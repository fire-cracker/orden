import { validationHandler } from './validationHandler'
import { createOrderSchema, updateOrderSchema } from './schemas/orders.schema'

/**
 * @export
 * @function createOrderValidator
 * @param {Object} req - request received
 * @param {Object} res - response object
 * @param {Object} next - next object
 * @returns {Object} next object
 */
export const createOrderValidator = (req, res, next) => {
  validationHandler(req, res, next, createOrderSchema)
}

/**
 * @export
 * @function updateOrderValidator
 * @param {Object} req - request received
 * @param {Object} res - response object
 * @param {Object} next - next object
 * @returns {Object} next object
 */
export const updateOrderValidator = (req, res, next) => {
  validationHandler(req, res, next, updateOrderSchema)
}
