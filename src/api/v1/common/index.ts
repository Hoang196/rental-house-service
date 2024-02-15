import { Router } from 'express';
import { asyncRouteHandler, authMiddleware } from 'middlewares';
import * as controller from './controller';

const router = Router();

router.get('/search', authMiddleware, asyncRouteHandler(controller.getDataSearch));
router.get('/top-favourite', asyncRouteHandler(controller.getTopFavourite));
router.get('/check-like', authMiddleware, asyncRouteHandler(controller.checkUserLikePost));
router.get('/random-house', asyncRouteHandler(controller.getRandomHouse));
router.get('/statistic', asyncRouteHandler(controller.getStatistics));

export default router;
