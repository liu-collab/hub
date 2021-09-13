class loginRouter {
  async login(ctx, next) {
    const { name } = ctx.request.body;
    ctx.body = `欢迎${name}回来`;
    await next();
  }
}

module.exports = new loginRouter();
