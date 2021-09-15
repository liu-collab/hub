const commentService = require('../service/comment.service');
const errType = require('../contants/errType');

class MommentController {
  async create(ctx, next) {
    try {
      //获取相关数据
      const { momentId, conent } = ctx.request.body;
      const userId = ctx.user.id;
      //插入到数据
      const result = await commentService.create(momentId, conent, userId);
      ctx.body = result;
    } catch (err) {
      console.log(err);
      const error = new Error(errType.ERROR_REQUEST);
      ctx.app.emit('error', error, ctx);
    }
  }
  //回复评论
  async reply(ctx, next) {
    try {
      const { momentId, conent } = ctx.request.body;
      const { commentId } = ctx.params;
      const userId = ctx.user.id;

      const result = await commentService.reply(
        momentId,
        conent,
        userId,
        commentId
      );
      ctx.body = result;
    } catch (err) {
      console.log(err);
      const error = new Error(errType.ERROR_REQUEST);
      ctx.app.emit('error', error, ctx);
    }
  }
  //修改
  async update(ctx, next) {
    try {
      const commentId = ctx.params.commentId;
      const conent = ctx.request.body.conent;
      const result = await commentService.update(commentId, conent);
      ctx.body = result;
    } catch (err) {
      console.log(err);
      const error = new Error(errType.ERROR_REQUEST);
      ctx.app.emit('error', error, ctx);
    }
  }
  async remove(ctx, next) {
    try {
      const commentId = ctx.params.commentId;
      const result = await commentService.remove(commentId);
      ctx.body = result;
    } catch (err) {
      console.log(err);
      const error = new Error(errType.ERROR_REQUEST);
      ctx.app.emit('error', error, ctx);
    }
  }
}

module.exports = new MommentController();
