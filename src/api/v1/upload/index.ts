import { Router } from 'express';
import { asyncRouteHandler, authMiddleware } from 'middlewares';
import * as controller from './controller';
import { uploadCloud } from 'middlewares';
const router = Router();

router.post('/', authMiddleware, uploadCloud.single('file'), asyncRouteHandler(controller.uploadFile));

export default router;
