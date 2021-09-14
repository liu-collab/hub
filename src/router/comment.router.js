const Router = require('koa-router');

const commentRouter = new Router({ prefix: '/comment' });
const {
  verifyAuth,
  verifyPremission,
} = require('../middleware/login-error-midddleware');

const {
  create,
  reply,
  update,
  remove,
} = require('../controller/comment.controller.js');
//发表评论
commentRouter.post('/', verifyAuth, create);
//回复评论
commentRouter.post('/:commentId/reply', verifyAuth, reply);
//修改评论
commentRouter.patch('/:commentId', verifyAuth, verifyPremission, update);
//删除评论
commentRouter.delete('/:commentId', verifyAuth, verifyPremission, remove);

module.exports = commentRouter;
