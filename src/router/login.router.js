const Router = require('koa-router');

const loginRouter = new Router();

const { login, success } = require('../controller/login.controller');

const {
  verifylogin,
  verifyAuth,
} = require('../middleware/login-error-midddleware');

loginRouter.post('/login', verifylogin, login);
loginRouter.get('/test', verifyAuth, success);

module.exports = loginRouter;
