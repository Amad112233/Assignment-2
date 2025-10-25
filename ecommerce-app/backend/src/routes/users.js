import { Router } from 'express';
import { authRequired } from '../middleware/authMiddleware.js';
import { me, updateMe } from '../controllers/usersController.js';
const router = Router();

router.use(authRequired);
router.get('/me', me);
router.put('/me', updateMe);

export default router;
