import { Router } from 'express';
import { asyncRouteHandler, authMiddleware, validationMiddleware } from 'middlewares';
import * as controller from './controller';
import { AuthDto, RefreshDto, ChangePasswordDto } from './dtos';

const router = Router();

router.post('/login', validationMiddleware(AuthDto, 'body'), asyncRouteHandler(controller.login));
router.post('/register', validationMiddleware(AuthDto, 'body'), asyncRouteHandler(controller.register));
router.post('/refresh', validationMiddleware(RefreshDto, 'body'), asyncRouteHandler(controller.refresh));
router.post(
  '/change-password',
  authMiddleware,
  validationMiddleware(ChangePasswordDto, 'body'),
  asyncRouteHandler(controller.changePassword)
);

export default router;
