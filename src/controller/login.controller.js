const jwt = require('jsonwebtoken');
const { PRIVATE_KEY } = require('../app/config');
class loginRouter {
  async login(ctx, next) {
    try {
      const { id, name } = ctx.user;
      //生成token
      const token = jwt.sign({ id, name }, PRIVATE_KEY, {
        expiresIn: 60 * 60 * 24,
        algorithm: 'RS256',
      });
      //返回信息
      ctx.body = {
        id,
        name,
        token,
      };
      await next();
    } catch (err) {
      console.log(err);
      const error = new Error(errType.ERROR_REQUEST);
      ctx.app.emit('error', error, ctx);
    }
  }
}

module.exports = new loginRouter();
