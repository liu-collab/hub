const service = require('../service/moment.service');
class MomentController {
  async create(ctx, next) {
    try {
      //获取评论相关数据
      const userId = ctx.user.id;
      const content = ctx.request.body.content;
      // console.log(userId, content);
      //将数据插入到数据库中
      const result = await service.create(userId, content);
      ctx.body = result;
    } catch (error) {
      console.log(error);
    }
  }
  //获取单个动态
  async detail(ctx, next) {
    try {
      //获取动态的id
      const momentId = ctx.params.momentId;
      // 在数据库中查找相应的动态
      const result = await service.getMomentById(momentId);
      ctx.body = result;
    } catch (error) {
      console.log(error);
    }
  }
  //获取动态列表接口
  async list(ctx, next) {
    try {
      const { offset, size } = ctx.query;
      const result = await service.getMomentList(offset, size);
      ctx.body = result;
    } catch (error) {
      console.log(error);
    }
  }
  //修改
  async change(ctx, next) {
    try {
      const momentId = ctx.params.momentId;
      const content = ctx.request.body.content;
      const result = await service.update(momentId, content);
      ctx.body = result;
    } catch (error) {
      console.log(error);
    }
  }
  //删除
  async remove(ctx, next) {
    try {
      //获取参数
      const momentId = ctx.params.momentId;
      //数据库删除
      const result = await service.remove(momentId);
      ctx.body = result;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new MomentController();
