const { Router } = require('express');
const router = Router();

const signupRouter = require('./signup.routes');
const loginRouter = require('./login.routes');
const postsRouter = require('./posts.routes');
const commentsRouter = require('./comments.routes');

router.use('/signup', signupRouter);
router.use('/login', loginRouter);
router.use('/posts', postsRouter);
router.use('/comments', commentsRouter);

module.exports = router;
