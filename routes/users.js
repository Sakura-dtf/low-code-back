const router = require("koa-router")();
const {
  login,
  register,
  createCode,
  setUserAuth,
  getProjectAllUser,
} = require("../controller/user");
const { capFail } = require("../db/model/ErrorInfo");
const checkToken = require("../middlewares/checkToken");
router.prefix("/user");

router.post("/login", async (ctx, next) => {
  const { username, password, project, captcha } = ctx.request.body;
  if (ctx.session.code) {
    if (ctx.session.code !== captcha.toLowerCase()) {
      ctx.body = capFail;
      return false;
    }

    ctx.body = await login({ username, password, project, captcha });
  } else {
    ctx.body = capFail;
  }
});

router.post("/register", async (ctx, next) => {
  const { username, password } = ctx.request.body;
  ctx.body = await register({ username, password });
});

router.get("/getCode", async (ctx) => {
  const code = createCode();
  ctx.session.code = code.text.toLowerCase();
  console.log(ctx.session.code, "111");
  ctx.response.type = "image/svg+xml"; //设置返回的数据格式
  ctx.body = code.data;
});

router.post("/setUserAuthByLogin", checkToken, async (ctx) => {
  let userId = ctx.request.userInfo.id;
  let authId = ctx.request.body.authId;
  ctx.body = await setUserAuth({ userId, authId });
});

router.post("/setUserAuth", async (ctx) => {
  let userId = ctx.request.body.userId;
  let authId = ctx.request.body.authId;
  ctx.body = await setUserAuth({ userId, authId });
});

router.post("/getProjectAllUser", async (ctx) => {
  let projectId = ctx.request.body.projectId;
  ctx.body = await getProjectAllUser(projectId);
});

module.exports = router;
