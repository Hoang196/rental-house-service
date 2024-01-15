import { Router } from 'express';
import authRouter from './auth';
import categoryRouter from './category';
import postRouter from './post';
import userRouter from './users';

const router = Router();

router.use('/auth', authRouter);
router.use('/category', categoryRouter);
router.use('/post', postRouter);
router.use('/users', userRouter);

export default router;
