const Koa = require('koa');
const { koaBody } = require('koa-body');
const KoaLogger = require('koa-logger');
const cors = require('@koa/cors');
const session = require('koa-session');
const koaJWT = require('koa-jwt');
const router = require('./routes');
const orm = require('./models');

const app = new Koa();

app.use(cors());
app.context.orm = orm;

app.use(KoaLogger());
app.use(koaBody());

app.keys = [`${process.env.SECRET_KEY}`];
const config = {
  httpOnly: false,

};
app.use(session(config, app));

app.use(router.routes());

app.use(async (ctx, next) => {
  ctx.body = 'Hello World!';
});

const port = process.env.PORT || 3000;

app.listen(port, '0.0.0.0', () => {
  console.log('server is running at http://localhost:3000');
});

module.exports = app;
