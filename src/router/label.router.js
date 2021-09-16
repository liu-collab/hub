const Router = require('koa-router');

const labelRouter = new Router({ prefix: '/label' });

const { verifyAuth } = require('../middleware/login-error-midddleware');

const { create } = require('../controller/label.controller.js');

labelRouter.post('/', verifyAuth, create);

module.exports = labelRouter;
