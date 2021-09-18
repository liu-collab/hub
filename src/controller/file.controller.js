const FileService = require('../service/file.service.js');

class AvatarController {
  //保存上传的头像信息
  async saveAvatarInfo(ctx, next) {
    const userId = ctx.user.id;
    const { filename, mimetype, size } = ctx.req.file;
    const result = await FileService.save(filename, mimetype, size, userId);
    ctx.body = result;
  }
}
module.exports = new AvatarController();
