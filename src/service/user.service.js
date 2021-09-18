//用户处理方法的业务逻辑
const connection = require('../app/database');
const errType = require('../contants/errType');
class UserService {
  // 创建用户
  async create(user) {
    try {
      //将user存储到数据库
      //拿到用户注册数据
      const { name, password } = user;

      //定义SQL语句
      const statement = `INSERT INTO users (name,password) VALUES (?,?);`;
      //处理SQL语句并且返回结果
      const result = await connection.execute(statement, [name, password]);
      //返回数据

      return result[0];
    } catch (err) {
      console.log(err);
      const error = new Error(errType.SQL_ERROR);
      ctx.app.emit('error', error, ctx);
    }
  }
  // 查询用户是否存在
  async getUserByNane(name) {
    try {
      const statement = `SELECT * FROM users WHERE name = ?;`;
      const result = await connection.execute(statement, [name]);
      return result[0];
    } catch (err) {
      console.log(err);
      const error = new Error(errType.SQL_ERROR);
      ctx.app.emit('error', error, ctx);
    }
  }
  //保存图片的url到用户表中
  async updateAvatarURLById(avatURL, userId) {
    try {
      const statement = `UPDATE users SET avatar_url = ? WHERE id = ?;`;
      const [result] = await connection.execute(statement, [avatURL, userId]);
      return result;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new UserService();
