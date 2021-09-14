const Router = require('koa-router');

const commentRouter = new Router({ prefix: '/comment' });
const { verifyAuth } = require('../middleware/login-error-midddleware');

const { create, reply } = require('../controller/comment.controller.js');
//发表评论
commentRouter.post('/', verifyAuth, create);
//回复评论
commentRouter.post('/:commentId/reply', verifyAuth, reply);

module.exports = commentRouter;
