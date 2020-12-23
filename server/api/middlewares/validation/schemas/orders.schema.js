import Joi from 'joi'

const email = Joi.string().trim().min(5).max(50).email({ minDomainSegments: 2 })
const name = Joi.string().trim().min(2).max(100)
const phone = Joi.number().integer()
const city = Joi.string().trim().allow(null, '').max(50)
const street = Joi.string().trim().allow(null, '').max(100)
const country = Joi.string().trim().allow(null, '').max(50)
const zip = Joi.number().integer().allow(null, '')
const bookingDate = Joi.number().integer()
const title = Joi.string().trim().min(1).max(50)

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
  bookingDate: bookingDate.required(),
  customer,
  title: title.required()
})

export const updateOrderSchema = Joi.object().keys({
  bookingDate,
  title
}).min(1)
