import express from 'express';
import * as commentController from '../controllers/commentController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// 公开路由
router.get('/post/:post_id', commentController.getCommentsByPostId);
router.get('/user/:user_id', commentController.getUserComments);

// 需要认证的路由
router.post('/', auth, commentController.createComment);
router.delete('/:id', auth, commentController.deleteComment);

export default router;