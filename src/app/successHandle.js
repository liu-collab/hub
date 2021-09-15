const successType = require('../contants/successType');

const successHandle = (success, ctx) => {
  const code = 200;
  let message = '';
  switch (success.message) {
    case successType.LOGIN_SUCCESS:
      message = '登录成功';
      break;
    case successType.CREATE_SUCCESS:
      message = '创建用户成功';
      break;
    case successType.PATCH_SUCCESS:
      message = '修改成功';
      break;
    case successType.COMMENT_SUCCESS:
      message = '发布评论成功';
      break;
    case successType.MOMENT_SUCCESS:
      message = '发布动态成功';
      break;
    case successType.PUBLIC_SUCCESS:
      message = '发布成功';
      break;
    default:
      message = 'success';
      break;
  }
  ctx.status = code;
  ctx.body = message;
};
module.exports = successHandle;
