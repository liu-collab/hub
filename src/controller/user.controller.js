//调用用户处理的方法

const service = require('../service/user.service');

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
      ctx.body = result;
    } catch (err) {
      console.log(err);
      const error = new Error(errType.ERROR_REQUEST);
      ctx.app.emit('error', error, ctx);
    }
  }
}

module.exports = new UserController();
