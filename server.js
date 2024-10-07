const Koa = require('koa')
const http = require('http')
const KoaBody = require('koa-body');
const router = require('./routers');
const koaBody = require('koa-body');

const app = new Koa();

app.use(koaBody({
  urlencoded:true,
}))
app.use((ctx,next) =>{
  const origin = ctx.request.get('Origin')
  if(!origin){
    return next()
  }
  const headers = { 'Access-Control-Allow-Origin': '*', };
  if (ctx.request.method !== 'OPTIONS') {
    ctx.response.set({ ...headers });
    try {
      return next();
    } catch (e) {
      e.headers = { ...e.headers, ...headers };
      throw e;
    }
  }
  if (ctx.request.get('Access-Control-Request-Method')) {
    ctx.response.set({
      ...headers,
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH',
    });

    if (ctx.request.get('Access-Control-Request-Headers')) {
      ctx.response.set('Access-Control-Allow-Headers', ctx.request.get('Access-Control-Request-Headers'));
    }

    ctx.response.status = 204;
  }
});

//TODO: write code here

app.use(router());
const port = process.env.PORT || 7090;
const server = http.createServer(app.callback());
server.listen(port);