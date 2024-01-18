import { Router } from 'express';
import authRouter from './auth';
import categoryRouter from './category';
import postRouter from './house';
import userRouter from './users';
import chatRouter from './chat';
import commonRouter from './common';

const router = Router();

router.use('/auth', authRouter);
router.use('/category', categoryRouter);
router.use('/house', postRouter);
router.use('/users', userRouter);
router.use('/chat', chatRouter);
router.use('/common', commonRouter);

export default router;
