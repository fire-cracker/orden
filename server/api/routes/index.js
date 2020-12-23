import { Router } from 'express'

import { createOrder } from '../controllers/orders.controllers'
import { createOrderValidator } from '../middlewares/validation/orders.validation'

const router = Router()

router.post('/orders', createOrderValidator, createOrder)

export default router
