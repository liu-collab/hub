//用户处理方法的业务逻辑

class UserService {
  async create(user) {
    //将user存储到数据库
    console.log(user);
    return '用户创建成功';
  }
}

module.exports = new UserService();
