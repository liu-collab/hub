const jwt = require('jsonwebtoken');

const errType = require('../contants/errType');
const service = require('../service/user.service');
const md5password = require('../utils/password-handle');
const { PUBLIC_KEY } = require('../app/config');
const verifylogin = async (ctx, next) => {
  //1.获取用户名和密码
  const { name, password } = ctx.request.body;
  //2.判断用户名和密码是否为空
  if (!name || !password) {
    const error = new Error(errType.NAME_OR_PASSWORD_IS_REQUIRED);
    return ctx.app.emit('error', error, ctx);
  }
  //3.判断用户名是否存在
  const result = await service.getUserByNane(name);
  const user = result[0];
  if (!user) {
    //用户不存在,抛出错误
    const error = new Error(errType.NAME_DOES_NOT_EXISTS);
    return ctx.app.emit('error', error, ctx);
  }
  //4.判断密码是否一致
  if (md5password(password) !== user.password) {
    const error = new Error(errType.PASSWORD_IS_ERROR);
    return ctx.app.emit('error', error, ctx);
  }
  ctx.user = user;
  await next();
};

const verifyAuth = async (ctx, next) => {
  //获取token
  const authorization = ctx.headers.authorization;
  //验证token是否为空
  if (!authorization) {
    const error = new Error(errType.UNAUTHORIZAATION);
    ctx.app.emit('error', error, ctx);
    return;
  }
  const token = authorization.replace('Bearer ', '');
  //公钥解析token
  try {
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ['RS256'],
    });

    ctx.user = result;

    await next();
  } catch (err) {
    console.log(err);
    const error = new Error(errType.UNAUTHORIZAATION);
    ctx.app.emit('error', error, ctx);
  }
};

module.exports = { verifylogin, verifyAuth };
