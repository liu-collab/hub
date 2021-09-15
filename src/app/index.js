const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const errHandle = require('./errhandle');
const successHandle = require('./successHandle');
const useRoutes = require('../router');
const app = new Koa();

app.useRoutes = useRoutes;

app.use(bodyParser());
//useRoutes(app)
app.useRoutes();
app.on('error', errHandle);
app.on('success', successHandle);

module.exports = app;
