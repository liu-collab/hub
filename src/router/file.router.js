const Router = require('koa-router');

const fileRouter = new Router({ prefix: '/upload' });

const { verifyAuth } = require('../middleware/login-error-midddleware');
const { AvatarHndle } = require('../middleware/avatar.middleware');
//上传头像的处理

const { FileHandle, pictureResize } = require('../middleware/file.middleware');
//上传图片的信息
const {
  saveAvatarInfo,
  saveFileInfo,
} = require('../controller/file.controller.js');
//上传图片
fileRouter.post('/avatar', verifyAuth, AvatarHndle, saveAvatarInfo);
//上传文件
fileRouter.post('/file', verifyAuth, FileHandle, pictureResize, saveFileInfo);
module.exports = fileRouter;
