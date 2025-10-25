import { Router } from 'express';
import { authRequired } from '../middleware/authMiddleware.js';
import { createOrder, listOrders } from '../controllers/ordersController.js';
const router = Router();

router.use(authRequired);
router.post('/', createOrder);
router.get('/', listOrders);

export default router;
