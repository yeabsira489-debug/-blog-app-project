const router = require('express').Router();
const controller = require('../controller/postController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', controller.getAllPosts);

router.get('/posts/new', authMiddleware, controller.newPostForm);
router.post('/posts', authMiddleware, controller.createPost);

router.get('/posts/:id', controller.getPostById);
router.get('/posts/:id/edit', authMiddleware, controller.editPostForm);
router.post('/posts/:id/update', authMiddleware, controller.updatePost);
router.post('/posts/:id/delete', authMiddleware, controller.deletePost);

module.exports = router;
