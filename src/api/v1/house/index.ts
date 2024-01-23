import { Router } from 'express';
import { asyncRouteHandler, validationMiddleware, authMiddleware } from 'middlewares';
import * as controller from './controller';
import { CreateHouseDto } from './dtos';

const router = Router();

router.get('/status', authMiddleware, asyncRouteHandler(controller.getPostsByStatus));
router.get('/user/:id', authMiddleware, asyncRouteHandler(controller.getPostsByUserId));
router.get('/postId/:id', authMiddleware, asyncRouteHandler(controller.getPosts));
router.get('/:id', authMiddleware, asyncRouteHandler(controller.getPosts));
router.post(
  '/',
  authMiddleware,
  validationMiddleware(CreateHouseDto, 'body'),
  asyncRouteHandler(controller.createPost)
);
router.patch('/:id', authMiddleware, asyncRouteHandler(controller.updatePost));
router.patch('/status', authMiddleware, asyncRouteHandler(controller.updateStatusPost));
router.delete('/:id', authMiddleware, asyncRouteHandler(controller.deletePost));

export default router;
