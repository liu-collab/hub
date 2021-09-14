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
  //获取单个动态
  async detail(ctx, next) {
    //获取动态的id
    const momentId = ctx.params.momentId;
    // 在数据库中查找相应的动态
    const result = await service.getMomentById(momentId);
    ctx.body = result;
  }
  //获取动态列表接口
  async list(ctx, next) {
    const { offset, size } = ctx.query;
    const result = await service.getMomentList(offset, size);
    ctx.body = result;
  }
}

module.exports = new MomentController();
