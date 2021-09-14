const Router = require('koa-router');

const commentRouter = new Router({ prefix: '/comment' });
const { verifyAuth } = require('../middleware/login-error-midddleware');

const { create } = require('../controller/comment.controller.js');

commentRouter.post('/', verifyAuth, create);

module.exports = commentRouter;
