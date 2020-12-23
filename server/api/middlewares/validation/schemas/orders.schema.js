import Joi from 'joi'

const email = Joi.string().trim().min(5).max(50).email({ minDomainSegments: 2 })
const name = Joi.string().trim().min(2).max(100)
const phone = Joi.number().integer()
const city = Joi.string().trim().allow(null, '').max(50)
const street = Joi.string().trim().allow(null, '').max(100)
const country = Joi.string().trim().allow(null, '').max(50)
const zip = Joi.number().integer().allow(null, '')
const bookingDate = Joi.number().integer().required()
const title = Joi.string().trim().max(50).required()

const address = Joi.object({
  city,
  street,
  country,
  zip
}).required()

const customer = Joi.object({
  email,
  name,
  phone
}).required()

export const createOrderSchema = Joi.object().keys({
  address,
  bookingDate,
  customer,
  title
})
