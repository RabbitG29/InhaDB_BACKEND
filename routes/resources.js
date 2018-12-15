const express = require('express');
const con = require('../connection');
const router = express.Router();
const postRouter = require('./resources/post');
const commentRouter = require('./resources/comment');
const boardRouter = require('./resources/board');

router.use('/post', postRouter);
router.use('/comment', commentRouter);
router.use('/board', boardRouter);
module.exports = router;
