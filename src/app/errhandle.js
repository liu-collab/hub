const errType = require('../contants/errType');

const errhandle = (error, ctx) => {
  let status, message;
  switch (error.message) {
    case errType.NAME_OR_PASSWORD_IS_REQUIRED:
      status = 400; //bad request
      message = '用户名和密码不能为空';
      break;
    case errType.NAME_IS_EXISTS:
      status = 409; //冲突 conflict
      message = '用户名已经存在';
      break;
    default:
      status = 404;
      message = 'NOT FOUND';
      break;
  }
  ctx.status = status;
  ctx.body = message;
};

module.exports = errhandle;
