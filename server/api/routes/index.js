import { Router } from 'express'

import { createOrder, patchOrder } from '../controllers/orders.controllers'
import { createOrderValidator,  updateOrderValidator } from '../middlewares/validation/orders.validation'

const router = Router()

router.post('/orders', createOrderValidator, createOrder)
router.put('/orders/:orderId',  updateOrderValidator, patchOrder)

export default router
