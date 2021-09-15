const Router = require('koa-router');

const loginRouter = new Router();

const { login } = require('../controller/login.controller');

const { verifylogin } = require('../middleware/login-error-midddleware');

loginRouter.post('/login', verifylogin, login);

module.exports = loginRouter;
