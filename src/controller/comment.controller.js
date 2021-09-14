const commentService = require('../service/comment.service');

class MommentController {
  async create(ctx, next) {
    //获取相关数据
    const { momentId, conent } = ctx.request.body;
    const userId = ctx.user.id;
    //插入到数据
    const result = await commentService.create(momentId, conent, userId);
    ctx.body = result;
  }
}

module.exports = new MommentController();
