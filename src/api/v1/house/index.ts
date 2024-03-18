import { Router } from 'express';
import { asyncRouteHandler, validationMiddleware, authMiddleware } from 'middlewares';
import * as controller from './controller';
import { CreateHouseDto } from './dtos';

const router = Router();

router.get('/status', authMiddleware, asyncRouteHandler(controller.getPostsByStatus));
router.get('/user', authMiddleware, asyncRouteHandler(controller.getPostsByUserId));
router.get('/:id', authMiddleware, asyncRouteHandler(controller.getPost));
router.get('/', asyncRouteHandler(controller.getPosts));
router.post(
  '/',
  authMiddleware,
  validationMiddleware(CreateHouseDto, 'body'),
  asyncRouteHandler(controller.createPost)
);
router.patch('/:id', authMiddleware, asyncRouteHandler(controller.updatePost));
router.put('/status', authMiddleware, asyncRouteHandler(controller.updateStatusPost));
router.delete('/:id', asyncRouteHandler(controller.deletePost));

export default router;
