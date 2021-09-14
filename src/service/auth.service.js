const connection = require('../app/database');

class AuthPermission {
  async checkMoment(momentId, userId) {
    try {
      const statement = `SELECT * FROM coment WHERE id = ? AND user_id = ?;`;
      const [result] = await connection.execute(statement, [momentId, userId]);
      return result.length === 0 ? false : true;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new AuthPermission();
