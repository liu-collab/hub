const AvatarService = require('../service/avatar.service.js');

class AvatarController {
  //保存上传的图片信息
  async saveAvatarInfo(ctx, next) {
    const userId = ctx.user.id;
    const { filename, mimetype, size } = ctx.req.file;
    const result = await AvatarService.save(filename, mimetype, size, userId);
    ctx.body = result;
  }
}
module.exports = new AvatarController();
