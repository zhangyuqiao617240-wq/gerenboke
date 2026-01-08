import express from 'express';
import * as postController from '../controllers/postController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// 公开路由
router.get('/', postController.getPosts);
router.get('/:id', postController.getPostById);
router.get('/user/:user_id', postController.getUserPosts);

// 需要认证的路由
router.post('/', auth, postController.createPost);
router.put('/:id', auth, postController.updatePost);
router.delete('/:id', auth, postController.deletePost);

export default router;