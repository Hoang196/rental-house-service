import { Router } from 'express';
import { asyncRouteHandler } from 'middlewares';
import * as controller from './controller';
import { uploadCloud } from 'middlewares';
const router = Router();

router.post('/', uploadCloud.single('file'), asyncRouteHandler(controller.uploadFile));

export default router;
