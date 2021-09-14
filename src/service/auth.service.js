const connection = require('../app/database');

class AuthPermission {
  async checkResource(tableName, resourceId, userId) {
    console.log(tableName);
    console.log(resourceId, userId);
    try {
      const statement = `SELECT * FROM ${tableName} WHERE id = ? AND user_id = ?;`;
      const [result] = await connection.execute(statement, [
        resourceId,
        userId,
      ]);
      console.log(result);
      return result.length === 0 ? false : true;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new AuthPermission();
