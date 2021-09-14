const connection = require('../app/database');

const sqlFragment = `
SELECT 
m.id id ,m.content content,m.createAt createTime,m.updateAt updateTime,
JSON_OBJECT('uid' ,u.id ,'name' ,u.name) author
FROM coment m
LEFT JOIN users u ON m.user_id = u.id
`;
class MomentService {
  async create(userId, content) {
    //sql语句
    const statement = `INSERT INTO coment (user_id,content) VALUES (?,?);`;
    const result = await connection.execute(statement, [userId, content]);
    return result[0];
  }
  async getMomentById(momentId) {
    //左连接查询用户评论相关数据
    const statement = `
     ${sqlFragment}
      WHERE m.id = ?;`;
    const [result] = await connection.execute(statement, [momentId]);
    return result[0];
  }
  async getMomentList(offset, size) {
    const statement = `
      ${sqlFragment}
      LIMIT ? ,?;
    `;
    const [result] = await connection.execute(statement, [offset, size]);
    return result;
  }
  async update(momentId, content) {
    const statement = `UPDATE coment SET content = ? WHERE id = ?
    `;
    const [result] = await connection.execute(statement, [content, momentId]);
    return result;
  }
}
module.exports = new MomentService();
