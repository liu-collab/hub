const service = require('../service/moment.service');
const successType = require('../contants/successType');

class MomentController {
  async create(ctx, next) {
    try {
      //获取动态相关数据
      const userId = ctx.user.id;
      const content = ctx.request.body.content;
      // console.log(userId, content);
      //将数据插入到数据库中
      const result = await service.create(userId, content);
      const { affectedRows } = result;
      if (affectedRows) {
        const success = new Error(successType.MOMENT_SUCCESS);
        ctx.app.emit('success', success, ctx);
      }
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
      const comentId = ctx.params.comentId;
      const content = ctx.request.body.content;
      const result = await service.update(comentId, content);
      const { affectedRows } = result;
      if (affectedRows) {
        const success = new Error(successType.PATCH_SUCCESS);
        ctx.app.emit('success', success, ctx);
      }
    } catch (err) {
      console.log(err);
      const error = new Error(errType.ERROR_REQUEST);
      ctx.app.emit('error', error, ctx);
    }
  }
  //删除
  async remove(ctx, next) {
    try {
      //获取参数
      const comentId = ctx.params.comentId;
      //数据库删除
      const result = await service.remove(comentId);

      const { affectedRows } = result;
      if (affectedRows) {
        const success = new Error(successType.DELETE_SUCCESS);
        ctx.app.emit('success', success, ctx);
      }
    } catch (err) {
      console.log(err);
      const error = new Error(errType.ERROR_REQUEST);
      ctx.app.emit('error', error, ctx);
    }
  }
  //给动态添加标签
  async addMomentLabel(ctx, next) {
    try {
      //1.拿到数据
      const { labels } = ctx;

      const { comentId } = ctx.params;

      //2.判断标签是否添加到动态中
      for (let label of labels) {
        const isExistMoment = await service.hasLabel(comentId, label.id);
        if (!isExistMoment) {
          await service.addLabel(comentId, label.id);
        }
      }
      ctx.body = '动态添加标签成功';
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new MomentController();
