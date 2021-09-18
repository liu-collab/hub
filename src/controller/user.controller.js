//调用用户处理的方法
const fs = require('fs');
const service = require('../service/user.service');
const FileService = require('../service/file.service.js');
const { AVATARPATH } = require('../contants/filePath');

const successType = require('../contants/successType');
class UserController {
  async create(ctx, next) {
    try {
      //获取用户传递的参数
      const user = ctx.request.body;
      // console.log(user);
      //查询用户的户数
      const result = await service.create(user);
      //console.log(result);
      //返回数据
      const { affectedRows } = result;
      if (affectedRows) {
        const success = new Error(successType.CREATE_SUCCESS);
        ctx.app.emit('success', success, ctx);
      }
    } catch (err) {
      console.log(err);
      const error = new Error(errType.ERROR_REQUEST);
      ctx.app.emit('error', error, ctx);
    }
  }

  //获取图片信息
  async avatarInfo(ctx, next) {
    try {
      const userId = ctx.params.userId;

      const result = await FileService.getAvatarById(userId);
      //设置响应的内容我image格式
      ctx.response.set('content-type', result.mimetype);
      //返回的结果在保存的图片文件夹下
      ctx.body = fs.createReadStream(`${AVATARPATH}/${result.filename}`);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new UserController();
