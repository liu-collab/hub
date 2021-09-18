const Router = require('koa-router');

const fileRouter = new Router({ prefix: '/upload' });

const { verifyAuth } = require('../middleware/login-error-midddleware');
//上传头像的处理
const { AvatarHndle } = require('../middleware/file.middleware');
//上传图片的信息
const { saveAvatarInfo } = require('../controller/file.controller.js');
fileRouter.post('/avatar', verifyAuth, AvatarHndle, saveAvatarInfo);

module.exports = fileRouter;
