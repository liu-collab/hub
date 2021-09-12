const errType = require('../contants/errType');
const service = require('../service/user.service');
//处理错误的中间件
const verifyuser = async (ctx, next) => {
  //1.获取用户名和密码
  const { name, password } = ctx.request.body;
  // console.log(name, password);
  //2.判断用户名的密码是否为空
  if (!name || !password || name === '' || password === '') {
    const error = new Error(errType.NAME_OR_PASSWORD_IS_REQUIRED);
    return ctx.app.emit('error', error, ctx);
  }
  //3.判断用户名是否已经注册
  const result = await service.getUserByNane(name);
  //console.log(result.length);
  if (result.length) {
    const error = new Error(errType.NAME_IS_EXISTS);
    return ctx.app.emit('error', error, ctx);
  }
  await next();
};

module.exports = verifyuser;
