const connection = require('../app/database');
const errType = require('../contants/errType');
class LabelService {
  async create(name) {
    try {
      const statement = `		INSERT INTO label (name) VALUES (?);`;
      const [result] = await connection.execute(statement, [name]);
      return result;
    } catch (err) {
      console.log(err);
      const error = new Error(errType.SQL_ERROR);
      ctx.app.emit('error', error, ctx);
    }
  }
  async isExistLabel(name) {
    const statement = `SELECT * FROM label  WHERE name = ?; `;
    const [result] = await connection.execute(statement, [name]);
    return result[0];
  }
}

module.exports = new LabelService();
