import Koa from 'koa';
const app = new Koa();

app.use(async (ctx, next) => {
  const start = new Date;
  await next();
  const ms = new Date - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

app.use(async (ctx, next) => {
  try {
    await next();
  } catch(err) {
    ctx.body = { message: err.message };
    ctx.status = err.status || 500;
    console.log(err);
  }
});

async function hoge() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Hello world!');
    }, 2000)
  })
};

app.use(async (ctx, next) => {
  ctx.body = await hoge();
});

app.listen(3000);