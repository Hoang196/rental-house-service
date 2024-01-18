import { Router } from 'express';
import { asyncRouteHandler, validationMiddleware, authMiddleware } from 'middlewares';
import * as controller from './controller';
import { CreateChatDto } from './dtos';

const router = Router();

router.get('/:id', authMiddleware, asyncRouteHandler(controller.getChats));
router.post('/', authMiddleware, validationMiddleware(CreateChatDto, 'body'), asyncRouteHandler(controller.createChat));
router.patch('/:id', authMiddleware, asyncRouteHandler(controller.updateChat));
router.delete('/:id', authMiddleware, asyncRouteHandler(controller.deleteChat));

export default router;
