const Router = require('koa-router');

const userRouter = new Router({ prefix: '/users' });

const { create } = require('../controller/user.controller');
const { verifyuser } = require('../middleware/error-middleware');
const passwordhandle = require('../middleware/password-middleware');

//分成不同模块进行处理不同的业务相关逻辑
//先进行验证用户模块的中间件,在开始创建用户模块的中间件
userRouter.post('/', verifyuser, passwordhandle, create);

module.exports = userRouter;
