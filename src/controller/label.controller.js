const labelService = require('../service/label.service');
const successType = require('../contants/successType');
class LabelController {
  async create(ctx, next) {
    try {
      const { name } = ctx.request.body;

      const result = await labelService.create(name);
      const { affectedRows } = result;
      if (affectedRows) {
        const success = new Error(successType.PUBLIC_SUCCESS);
        ctx.app.emit('success', success, ctx);
      }
    } catch (err) {
      console.log(err);
    }
  }
  async list(ctx, next) {
    const { offset, limit } = ctx.query;
    const result = await labelService.list(offset, limit);
    ctx.body = result;
  }
}
module.exports = new LabelController();
