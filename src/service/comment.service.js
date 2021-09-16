const connection = require('../app/database');
const errType = require('../contants/errType');
class CommentService {
  async create(momentId, conent, userId) {
    try {
      const statement = `	INSERT INTO comment (conent,user_id ,moment_id) VALUES (?,?,?);`;
      const [result] = await connection.execute(statement, [
        conent,
        userId,
        momentId,
      ]);
      return result;
    } catch (err) {
      console.log(err);
      const error = new Error(errType.SQL_ERROR);
      ctx.app.emit('error', error, ctx);
    }
  }
  async reply(momentId, conent, userId, commentId) {
    try {
      const statement = `INSERT INTO comment (conent,user_id ,moment_id ,coment_id) VALUES (?,?,?,?);`;
      const [result] = await connection.execute(statement, [
        conent,
        userId,
        momentId,
        commentId,
      ]);

      return result;
    } catch (err) {
      console.log(err);
      const error = new Error(errType.SQL_ERROR);
      ctx.app.emit('error', error, ctx);
    }
  }
  //修改动态
  async update(commentId, conent) {
    try {
      const statement = `UPDATE comment SET conent = ? WHERE id = ?`;
      const [result] = await connection.execute(statement, [conent, commentId]);
      return result;
    } catch (err) {
      console.log(err);
      const error = new Error(errType.SQL_ERROR);
      ctx.app.emit('error', error, ctx);
    }
  }
  //删除动态
  async remove(commentId) {
    try {
      const statement = `DELETE  FROM comment WHERE id = ?`;
      const [result] = await connection.execute(statement, [commentId]);
      return result;
    } catch (err) {
      console.log(err);
      const error = new Error(errType.SQL_ERROR);
      ctx.app.emit('error', error, ctx);
    }
  }
  async list(momentId) {
    try {
      const statement = `		SELECT 
      m.id ,m.conent ,m.moment_id momentId , m.coment_id comentId ,
      JSON_OBJECT('id' ,u.id ,'name' ,u.name) user
      FROM comment m
      LEFT JOIN users u ON u.id = m.user_id
       WHERE moment_id = ?; `;
      const [result] = await connection.execute(statement, [momentId]);
      return result;
    } catch (err) {
      console.log(err);
      const error = new Error(errType.SQL_ERROR);
      ctx.app.emit('error', error, ctx);
    }
  }
}
module.exports = new CommentService();
