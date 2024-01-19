import { Router } from 'express';
import { asyncRouteHandler, authMiddleware } from 'middlewares';
import * as controller from './controller';

const router = Router();

router.get('/search', authMiddleware, asyncRouteHandler(controller.getDataSearch));
router.get('/top-favourite', authMiddleware, asyncRouteHandler(controller.getTopFavourite));

export default router;
