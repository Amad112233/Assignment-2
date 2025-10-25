import { Router } from 'express';
import { authRequired } from '../middleware/authMiddleware.js';
import { getCart, addToCart, updateCartItem, removeFromCart } from '../controllers/cartController.js';
const router = Router();

router.use(authRequired);
router.get('/', getCart);
router.post('/', addToCart);
router.put('/:productId', updateCartItem);
router.delete('/:productId', removeFromCart);

export default router;
