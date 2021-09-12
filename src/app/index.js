const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const app = new Koa();
const userRouter = new Router({ prefix: '/user' });

const { create } = require('../controller/user.controller');

//分成不同模块进行处理不同的业务相关逻辑
userRouter.post('/', create);

app.use(bodyParser());
app.use(userRouter.routes());
app.use(userRouter.allowedMethods());

module.exports = app;
