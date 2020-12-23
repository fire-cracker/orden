/**
 * @export
 * @function validationHandler
 * @param {Object} req - request received
 * @param {Object} schema - response object
 * @param {Object} res - response object
 * @param {Object} next - next object
 * @returns {Object} next object
 */
export const validationHandler = async (
  req,
  res,
  next,
  schema
) => {
  try {
    await schema.validateAsync(req.body)
    next()
  } catch (error) {
    return res.status(400).send({
      status: 'fail',
      message: error.details[0].message
    })
  }
}
