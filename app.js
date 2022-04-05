const Koa = require("koa");
const app = new Koa();
const views = require("koa-views");
const json = require("koa-json");
const onerror = require("koa-onerror");
const bodyparser = require("koa-bodyparser");
const logger = require("koa-logger");
const cors = require("koa2-cors");

const koaJwt = require("koa-jwt");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("./config/secret");
const session = require("koa-session");

const index = require("./routes/index");
const users = require("./routes/users");
const auth = require("./routes/auth");
const project = require("./routes/project");
const router = require("./routes/router");

app.use(
  cors({
    origin: (ctx) => ctx.header.origin,
    credentials: true,
  })
);

// 错误处理
app.use((ctx, next) => {
  return next().catch((err) => {
    if (err.status === 401) {
      ctx.status = 401;
      console.log(111);
      ctx.body = "Protected resource, use Authorization header to get access\n";
    } else {
      throw err;
    }
  });
});

app.use(
  koaJwt({
    secret: jwtSecret,
  }).unless({
    path: [/\/user\/login/, /\/user\/register/, /\/user\/getCode/],
  })
);

app.keys = [jwtSecret];
app.use(
  session(
    {
      key: "koa:sess",
      maxAge: 60000,
      overwrite: true,
      httpOnly: true,
      signed: true,
      rolling: true, //每次访问将会重置过期时间
      renew: true,
    },
    app
  )
);

// error handler
onerror(app);

// middlewares
app.use(
  bodyparser({
    enableTypes: ["json", "form", "text"],
  })
);
app.use(json());
app.use(logger());
app.use(require("koa-static")(__dirname + "/public"));

app.use(
  views(__dirname + "/views", {
    extension: "ejs",
  })
);

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// routes
app.use(index.routes(), index.allowedMethods());
app.use(users.routes(), users.allowedMethods());
app.use(auth.routes(), auth.allowedMethods());
app.use(project.routes(), project.allowedMethods());
app.use(router.routes(), router.allowedMethods());

// error-handling
app.on("error", (err, ctx) => {
  console.error("server error", err, ctx);
});

module.exports = app;
