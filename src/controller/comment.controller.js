const commentService = require('../service/comment.service');
const errType = require('../contants/errType');
const successType = require('../contants/successType');
class MommentController {
  async create(ctx, next) {
    //评论
    try {
      //获取相关数据
      const { momentId, conent } = ctx.request.body;
      const userId = ctx.user.id;
      //插入到数据
      const result = await commentService.create(momentId, conent, userId);
      const { affectedRows } = result;
      if (affectedRows) {
        const success = new Error(successType.COMMENT_SUCCESS);
        ctx.app.emit('success', success, ctx);
      }
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
      const { affectedRows } = result;
      if (affectedRows) {
        const success = new Error(successType.PUBLIC_SUCCESS);
        ctx.app.emit('success', success, ctx);
      }
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
      const { affectedRows } = result;
      if (affectedRows) {
        const success = new Error(successType.PATCH_SUCCESS);
        ctx.app.emit('success', success, ctx);
      }
      // ctx.body = result;
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
}

module.exports = new MommentController();
