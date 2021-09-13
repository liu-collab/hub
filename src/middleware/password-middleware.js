const md5password = require('../utils/password-handle');

const passwordhandle = async (ctx, next) => {
  const { password } = ctx.request.body;
  //加密密码后重新赋值
  ctx.request.body.password = md5password(password);

  await next();
};

module.exports = passwordhandle;
