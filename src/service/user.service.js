//用户处理方法的业务逻辑
const connection = require('../app/database');
class UserService {
  // 创建用户
  async create(user) {
    //将user存储到数据库
    //拿到用户注册数据
    const { name, password } = user;
    //定义SQL语句
    const statement = `INSERT INTO users (name,password) VALUES (?,?);`;
    //处理SQL语句并且返回结果
    const result = await connection.execute(statement, [name, password]);
    //返回数据
    return result[0];
  }
  // 查询用户是否存在
  async getUserByNane(name) {
    const statement = `SELECT * FROM users WHERE name = ?;`;
    const result = await connection.execute(statement, [name]);
    return result[0];
  }
}

module.exports = new UserService();
