import {Router} from 'express';
import {refreshTokenController} from '../controllers/refresh.token';

const router = Router();

router.post('/refresh_token', refreshTokenController);

export default router;
