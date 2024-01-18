import { Router } from 'express';
import { asyncRouteHandler, authMiddleware } from 'middlewares';
import * as controller from './controller';

const router = Router();

router.get('/search', authMiddleware, asyncRouteHandler(controller.getDataSearch));

export default router;
