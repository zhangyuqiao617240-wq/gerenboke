import express from 'express';
import * as userController from '../controllers/userController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// 公开路由
router.post('/register', userController.register);
router.post('/login', userController.login);

// 需要认证的路由
router.get('/me', auth, userController.getCurrentUser);
router.put('/me', auth, userController.updateUser);
router.put('/change-password', auth, userController.changePassword);

export default router;