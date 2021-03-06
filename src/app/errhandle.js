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
    case errType.NAME_DOES_NOT_EXISTS:
      status = 400; //参数错误
      message = '用户名不存在';
      break;
    case errType.PASSWORD_IS_ERROR:
      status = 400; //参数错误
      message = '密码错误';
      break;
    case errType.UNAUTHORIZAATION:
      status = 401; //参数错误
      message = '无效token~';
      break;
    case errType.UNPERMISSION:
      status = 401; //参数错误
      message = '未授权权限~';
      break;
    case errType.ERROR_REQUEST:
      status = 401; //参数错误
      message = '参数错误~';
      break;
    case errType.SQL_ERROR:
      status = 503; //服务器没有准备好处理请求
      message = '服务器未能响应';
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
