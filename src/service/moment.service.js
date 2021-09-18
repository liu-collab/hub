const connection = require('../app/database');

class MomentService {
  async create(userId, content) {
    try {
      //sql语句
      const statement = `INSERT INTO coment (user_id,content) VALUES (?,?);`;
      const result = await connection.execute(statement, [userId, content]);
      return result[0];
    } catch (err) {
      console.log(err);
      const error = new Error(errType.SQL_ERROR);
      ctx.app.emit('error', error, ctx);
    }
  }
  //动态和动态的评论有两种方法
  //1.将动态和评论分成两个接口,分别进行查询,返回相应数据
  //2.将动态和评论用一个接口,利用SQL的左连接将数据查询生成一个新的表在返回数据
  //获取单个动态
  async getMomentById(momentId) {
    try {
      //左连接查询用户评论相关数据
      //获取动态时,将动态的评论也一起查询,返回相应的数据
      const statement = `		
      SELECT 
        m.id id ,m.content content,m.createAt createTime,m.updateAt updateTime,
        JSON_OBJECT('uid' ,u.id ,'name' ,u.name ,'avatarurl' ,u.avatar_url) author,
        (SELECT IF(COUNT(c.id),JSON_ARRAYAGG(JSON_OBJECT(
        'id' ,c.id , 'conent' ,c.conent , 'commentId' ,c.coment_id ,'createTime' ,c.createAt ,'updateTime',c.updateAt,'user',JSON_OBJECT('id' ,cu.id , 'name',cu.name ,'avatarurl' ,cu.avatar_url))
            ) ,NULL) FROM comment c LEFT JOIN users cu ON c.user_id = cu.id WHERE m.id = c.moment_id
        ) comments,
          IF(COUNT(l.id),JSON_ARRAYAGG(JSON_OBJECT('id',l.id ,'name',l.name)) ,NULL) label,
          (SELECT JSON_ARRAYAGG(CONCAT('http://localhost:8888/moment/images/',file.filename)) FROM file WHERE m.id = file.coment_id) images
        FROM coment m
        LEFT JOIN users u ON m.user_id = u.id 

        LEFT JOIN moment_label ml ON ml.moment_id = m.id
        LEFT JOIN label l ON l.id = ml.label_id 
        WHERE m.id = ?
      ORDER BY m.id`;
      const [result] = await connection.execute(statement, [momentId]);
      return result[0];
    } catch (err) {
      console.log(err);
      const error = new Error(errType.SQL_ERROR);
      ctx.app.emit('error', error, ctx);
    }
  }
  //获取动态列表
  // 获取所有的动态和发布动态的用户,评论动态的条数
  async getMomentList(offset, size) {
    try {
      const statement = `
      SELECT 
        m.id id ,m.content content,m.createAt createTime,m.updateAt updateTime,
        JSON_OBJECT('uid' ,u.id ,'name' ,u.name) author,
        (SELECT COUNT(*) FROM comment c WHERE c.coment_id = m.id  ) commentCount,
        (SELECT COUNT(*) FROM moment_label ml WHERE ml.moment_id = m.id  ) labelCount
      FROM coment m
      LEFT JOIN users u ON m.user_id = u.id
      LIMIT ? ,?;`;
      const [result] = await connection.execute(statement, [offset, size]);
      return result;
    } catch (err) {
      console.log(err);
      const error = new Error(errType.SQL_ERROR);
      ctx.app.emit('error', error, ctx);
    }
  }
  //修改动态
  async update(comentId, content) {
    try {
      const statement = `UPDATE coment SET content = ? WHERE id = ?`;
      const [result] = await connection.execute(statement, [content, comentId]);
      return result;
    } catch (err) {
      console.log(err);
      const error = new Error(errType.SQL_ERROR);
      ctx.app.emit('error', error, ctx);
    }
  }
  //删除动态
  async remove(comentId) {
    try {
      const statement = `DELETE  FROM coment WHERE id = ?`;
      const [result] = await connection.execute(statement, [comentId]);
      return result;
    } catch (err) {
      console.log(err);
      const error = new Error(errType.SQL_ERROR);
      ctx.app.emit('error', error, ctx);
    }
  }
  //查找标签是否在动态中
  async hasLabel(comentId, labelId) {
    try {
      const statemt = `	SELECT * FROM moment_label WHERE  moment_id = ? AND label_id = ? ;`;
      const [result] = await connection.execute(statemt, [comentId, labelId]);
      return result[0];
    } catch (err) {
      console.log(err);
      const error = new Error(errType.SQL_ERROR);
      ctx.app.emit('error', error, ctx);
    }
  }
  async addLabel(comentId, labelId) {
    try {
      const statement = `INSERT INTO moment_label (moment_id,label_id) VALUES (?,?) ;`;
      const [result] = await connection.execute(statement, [comentId, labelId]);
      return result;
    } catch (err) {
      console.log(err);
      const error = new Error(errType.SQL_ERROR);
      ctx.app.emit('error', error, ctx);
    }
  }
  async getFile(filename) {
    try {
      const statement = `	SELECT * FROM file WHERE  filename = ?;`;

      const [result] = await connection.execute(statement, [filename]);

      return result[0];
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = new MomentService();
