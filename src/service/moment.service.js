const connection = require('../app/database');

class MomentService {
  async create(userId, content) {
    //sql语句
    const statement = `INSERT INTO coment (user_id,content) VALUES (?,?);`;
    const result = await connection.execute(statement, [userId, content]);
    return result[0];
  }
}
module.exports = new MomentService();
