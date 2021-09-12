const app = require('./app');

const config = require('./app/config');
require('./app/database');
app.listen(config.APP_PORT, () => {
  console.log(`项目在${config.APP_PORT}启动成功`);
});
