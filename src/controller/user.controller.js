//调用用户处理的方法

const service = require('../service/user.service');

class UserController {
  async create(ctx, next) {
    //获取用户传递的参数
    const user = ctx.request.body;
    //查询用户的户数
    const result = await service.create(user);
    //返回数据
    ctx.body = result;
  }
}

module.exports = new UserController();
