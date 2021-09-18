const connection = require('../app/database');

class AvatarService {
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
}

module.exports = new AvatarService();
