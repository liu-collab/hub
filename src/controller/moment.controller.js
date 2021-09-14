const service = require('../service/moment.service');

class MomentController {
  async create(ctx, next) {
    //获取评论相关数据
    const userId = ctx.user.id;
    const content = ctx.request.body.content;
    // console.log(userId, content);
    //将数据插入到数据库中
    const result = await service.create(userId, content);
    ctx.body = result;
  }
}

module.exports = new MomentController();
