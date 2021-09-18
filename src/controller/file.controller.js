const FileService = require('../service/file.service.js');
const userService = require('../service/user.service');
const path = require('path');
const { APP_PORT, APP_HOST } = require('../app/config');
class AvatarController {
  //保存上传的头像信息
  async saveAvatarInfo(ctx, next) {
    const userId = ctx.user.id;
    const { filename, mimetype, size } = ctx.req.file;
    //保存图片信息
    const result = await FileService.save(filename, mimetype, size, userId);
    //将图片的url保存到users表中

    const avatURL = `${APP_HOST}:${APP_PORT}/users/${userId}/avatar`;
    await userService.updateAvatarURLById(avatURL, userId);
    ctx.body = '上传图片成功';
  }
  //上传文件
  async saveFileInfo(ctx, next) {
    const userId = ctx.user.id;
    const files = ctx.req.files;

    const { comentId } = ctx.query;
    for (let file of files) {
      const { filename, mimetype, size } = file;

      const result = await FileService.getFile(
        filename,
        mimetype,
        size,
        userId,
        comentId
      );
      ctx.body = '上传文件成功';
    }
  }
}
module.exports = new AvatarController();
