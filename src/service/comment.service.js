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
}
module.exports = new CommentService();
