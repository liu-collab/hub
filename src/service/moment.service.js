const connection = require('../app/database');
const sqlFragment = `
SELECT 
m.id id ,m.content content,m.createAt createTime,m.updateAt updateTime,
JSON_OBJECT('uid' ,u.id ,'name' ,u.name) author
FROM coment m
LEFT JOIN users u ON m.user_id = u.id
`;
class MomentService {
  async create(userId, content) {
    try {
      //sql语句
      const statement = `INSERT INTO coment (user_id,content) VALUES (?,?);`;
      const result = await connection.execute(statement, [userId, content]);
      return result[0];
    } catch (err) {
      console.log(err);
      const error = new Error(errType.SQL_ERROR);
      ctx.app.emit('error', error, ctx);
    }
  }
  //获取单个动态
  async getMomentById(momentId) {
    try {
      //左连接查询用户评论相关数据
      const statement = `
    ${sqlFragment}
     WHERE m.id = ?;`;
      const [result] = await connection.execute(statement, [momentId]);
      return result[0];
    } catch (err) {
      console.log(err);
      const error = new Error(errType.SQL_ERROR);
      ctx.app.emit('error', error, ctx);
    }
  }
  //获取动态列表
  async getMomentList(offset, size) {
    try {
      const statement = `
      ${sqlFragment}
      LIMIT ? ,?;`;
      const [result] = await connection.execute(statement, [offset, size]);
      return result;
    } catch (err) {
      console.log(err);
      const error = new Error(errType.SQL_ERROR);
      ctx.app.emit('error', error, ctx);
    }
  }
  //修改动态
  async update(momentId, content) {
    try {
      const statement = `UPDATE coment SET content = ? WHERE id = ?`;
      const [result] = await connection.execute(statement, [content, momentId]);
      return result;
    } catch (err) {
      console.log(err);
      const error = new Error(errType.SQL_ERROR);
      ctx.app.emit('error', error, ctx);
    }
  }
  //删除动态
  async remove(momentId) {
    try {
      const statement = `DELETE  FROM coment WHERE id = ?`;
      const [result] = await connection.execute(statement, [momentId]);
      return result;
    } catch (err) {
      console.log(err);
      const error = new Error(errType.SQL_ERROR);
      ctx.app.emit('error', error, ctx);
    }
  }
}
module.exports = new MomentService();
