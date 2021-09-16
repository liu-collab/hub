const labelService = require('../service/label.service');
const verifyLabelExist = async (ctx, next) => {
  //验证label在数据库中是否存在,存在不用添加,不存在就添加到数据库
  const { labels } = ctx.request.body;
  const newLabels = [];
  //遍历label取到key
  for (let name of labels) {
    //判断标签是否存在
    const labelResult = await labelService.isExistLabel(name);
    //新建一个对象,存放label的name和在数据库中的id
    const label = { name };
    //不存在创建标签
    if (!labelResult) {
      const result = await labelService.create(name);
      label.id = result.insertId;
    } else {
      label.id = labelResult.id;
    }
    newLabels.push(label);
  }
  //处理好的label
  ctx.labels = newLabels;
  await next();
};

module.exports = {
  verifyLabelExist,
};
