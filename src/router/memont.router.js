const Router = require('koa-router');

const momentRouter = new Router({ prefix: '/moment' });

const {
  create,
  detail,
  list,
  change,
  remove,
  addMomentLabel,
  fileInfo,
} = require('../controller/moment.controller.js');
const {
  verifyAuth,
  verifyPremission,
} = require('../middleware/login-error-midddleware');
const { verifyLabelExist } = require('../middleware/label.middleware');

//发表动态接口
momentRouter.post('/', verifyAuth, create);
//获取动态接口
momentRouter.get('/:momentId', detail);
//获取动态列表
momentRouter.get('/', list);
//修改动态接口
momentRouter.patch('/:comentId', verifyAuth, verifyPremission, change);
//删除动态接口
momentRouter.delete('/:comentId', verifyAuth, verifyPremission, remove);
//给动态添加标签
momentRouter.post(
  '/:comentId/labels',
  verifyAuth,
  verifyPremission,
  verifyLabelExist,
  addMomentLabel
);
momentRouter.get('/images/:filename', fileInfo);
module.exports = momentRouter;
