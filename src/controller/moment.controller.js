class MomentController {
  async create(ctx, next) {
    ctx.body = '动态发布成功';
  }
}

module.exports = new MomentController();
