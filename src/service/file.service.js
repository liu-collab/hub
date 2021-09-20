const connection = require('../app/database');

class FileService {
  //保存上传的图片信息
  async save(filename, mimetype, size, userId) {
    const statement = `		INSERT INTO avatar (filename,mimetype , size,user_id) VALUES (?,?,?,?);`;
    const [result] = await connection.execute(statement, [
      filename,
      mimetype,
      size,
      userId,
    ]);
    return result;
  }
  //查询图片信息
  async getAvatarById(userId) {
    try {
      const statement = `		SELECT * FROM avatar WHERE user_id = ?;  `;
      const [result] = await connection.execute(statement, [userId]);

      return result.pop();
    } catch (error) {
      console.log(error);
    }
  }
  async getFile(filename, mimetype, size, userId, comentId) {
    try {
      const statement = `INSERT INTO file (filename,mimetype ,size,user_id ,coment_id) VALUES (?,?,?,?,?); `;
      const [result] = await connection.execute(statement, [
        filename,
        mimetype,
        size,
        userId,
        comentId,
      ]);

      return result[0];
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new FileService();
