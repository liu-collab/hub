const connection = require('../app/database');
class LabelService {
  async create(name) {
    try {
      const statement = `		INSERT INTO label (name) VALUES (?);`;
      const [result] = await connection.execute(statement, [name]);
      return result;
    } catch (err) {
      console.log(err);
    }
  }
  async isExistLabel(name) {
    const statement = `SELECT * FROM label  WHERE name = ?; `;
    const [result] = await connection.execute(statement, [name]);
    return result[0];
  }
  async list(offset, limit) {
    const statement = `SELECT * FROM label LIMIT ?,?; `;
    const [result] = await connection.execute(statement, [offset, limit]);
    return result;
  }
}

module.exports = new LabelService();
