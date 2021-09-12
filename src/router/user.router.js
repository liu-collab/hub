const Router = require('koa-router');

const userRouter = new Router({ prefix: '/user' });

const { create } = require('../controller/user.controller');
const verifyuser = require('../middleware/error-middleware');

//分成不同模块进行处理不同的业务相关逻辑
userRouter.post('/', verifyuser, create);

module.exports = userRouter;
