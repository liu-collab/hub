const connection = require('../app/database');

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
    } catch (error) {
      console.log(error);
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
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
    }
  }
  //修改动态
  async update(commentId, conent) {
    try {
      const statement = `UPDATE comment SET conent = ? WHERE id = ?`;
      const [result] = await connection.execute(statement, [conent, commentId]);
      return result;
    } catch (error) {
      console.log(error);
    }
  }
  //删除动态
  async remove(commentId) {
    try {
      const statement = `DELETE  FROM comment WHERE id = ?`;
      const [result] = await connection.execute(statement, [commentId]);
      return result;
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = new CommentService();
