const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
dotenv.config();

const PRIVATE_KEY = fs.readFileSync(
  path.resolve(__dirname, './keys/private.key')
);
const PUBLIC_KEY = fs.readFileSync(
  path.resolve(__dirname, './keys/public.key')
);

module.exports = {
  APP_PORT,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_DATABASE,
} = process.env;
//导出要在下面
module.exports.PRIVATE_KEY = PRIVATE_KEY;
module.exports.PUBLIC_KEY = PUBLIC_KEY;
