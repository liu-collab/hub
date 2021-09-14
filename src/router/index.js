const fs = require('fs');

//文件读取遍历所有的路由进行注册
// const useRoutes = (app) => {
//   fs.readdirSync(__dirname).forEach((file) => {
//     if (file === 'index.js') return;
//     const router = require(`./${file}`);
//     app.use(router.routes());
//     app.use(router.allowedMethods());
//   });
// };
//只有app使用,直接用this绑定this即可
const useRoutes = function () {
  fs.readdirSync(__dirname).forEach((file) => {
    if (file === 'index.js') return;
    const router = require(`./${file}`);
    this.use(router.routes());
    this.use(router.allowedMethods());
  });
};

module.exports = useRoutes;
