import { Router } from 'express';
import { asyncRouteHandler, validationMiddleware, authMiddleware } from 'middlewares';
import * as controller from './controller';
import { CreateFavouriteDto } from './dtos';

const router = Router();

router.get('/:id', authMiddleware, asyncRouteHandler(controller.getFavourites));
router.post(
  '/',
  authMiddleware,
  validationMiddleware(CreateFavouriteDto, 'body'),
  asyncRouteHandler(controller.createFavourite)
);
router.patch('/:id', authMiddleware, asyncRouteHandler(controller.updateFavourite));
router.delete('/:id', authMiddleware, asyncRouteHandler(controller.deleteFavourite));

export default router;
