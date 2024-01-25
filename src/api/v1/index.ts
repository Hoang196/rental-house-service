import { Router } from 'express';
import authRouter from './auth';
import categoryRouter from './category';
import houseRouter from './house';
import userRouter from './users';
import chatRouter from './chat';
import commonRouter from './common';
import uploadRouter from './upload';

const router = Router();

router.use('/auth', authRouter);
router.use('/category', categoryRouter);
router.use('/house', houseRouter);
router.use('/users', userRouter);
router.use('/chat', chatRouter);
router.use('/common', commonRouter);
router.use('/upload', uploadRouter);

export default router;
