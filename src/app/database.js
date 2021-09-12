const mysql = require('mysql2');
const config = require('./config');

const connection = mysql.createPool({
  host: config.MYSQL_HOST,
  port: config.MYSQL_PORT,
  user: config.MYSQL_USER,
  password: config.MYSQL_PASSWORD,
  database: config.MYSQL_DATABASE,
});

connection.getConnection((err, conn) => {
  if (err) {
    console.log('连接错误', err);
  } else {
    console.log('连接成功');
  }
});

module.exports = connection.promise();
