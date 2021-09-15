//调用用户处理的方法

const service = require('../service/user.service');
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
}

module.exports = new UserController();
