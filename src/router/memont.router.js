const Router = require('koa-router');

const momentRouter = new Router({ prefix: '/moment' });

const { create } = require('../controller/moment.controller.js');
const { verifyAuth } = require('../middleware/login-error-midddleware');

momentRouter.post('/', verifyAuth, create);

module.exports = momentRouter;
