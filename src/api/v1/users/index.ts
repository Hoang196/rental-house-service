import { Router } from 'express';
import { asyncRouteHandler, authMiddleware } from 'middlewares';
import * as controller from './controller';

const router = Router();

router.get('/me', authMiddleware, asyncRouteHandler(controller.getMe));
router.get('/:id', authMiddleware, asyncRouteHandler(controller.getUser));
router.get('/', authMiddleware, asyncRouteHandler(controller.getUsers));
router.patch('/:id', authMiddleware, asyncRouteHandler(controller.updateUser));
router.put('/me', authMiddleware, asyncRouteHandler(controller.updateMe));
router.delete('/:id', authMiddleware, asyncRouteHandler(controller.deleteUser));

export default router;
