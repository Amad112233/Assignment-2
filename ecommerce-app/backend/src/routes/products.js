import { Router } from 'express';
import { listProducts, getProduct, listCategories } from '../controllers/productsController.js';
const router = Router();

router.get('/', listProducts);
router.get('/categories', listCategories);
router.get('/:id', getProduct);

export default router;
