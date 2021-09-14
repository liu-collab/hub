const Router = require('koa-router');

const momentRouter = new Router({ prefix: '/moment' });

const { create, detail, list } = require('../controller/moment.controller.js');
const { verifyAuth } = require('../middleware/login-error-midddleware');

//发表动态接口
momentRouter.post('/', verifyAuth, create);
//获取动态接口
momentRouter.get('/:momentId', detail);
//获取动态列表
momentRouter.get('/', list);

module.exports = momentRouter;
