const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const app = new Koa();

const userRouter = require('../router/user.router');
const loginRoter = require('../router/login.router');
const errHandle = require('./errhandle');

app.use(bodyParser());
app.use(userRouter.routes());
app.use(userRouter.allowedMethods());
app.use(loginRoter.routes());
app.use(loginRoter.allowedMethods());

app.on('error', errHandle);

module.exports = app;
