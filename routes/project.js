const router = require("koa-router")();
const { addProject, getProject } = require("../controller/project");
const checkToken = require("../middlewares/checkToken");
router.prefix("/project");

router.post("/addProject", checkToken, async (ctx, next) => {
  let data = {
    name: ctx.request.body.name,
  };

  if (ctx.request.body.role && JSON.parse(ctx.request.body.role).length) {
    data.role = JSON.parse(ctx.request.body.role);
  }

  if (ctx.request.body.type) {
    data.type = ctx.request.body.type;
  }

  ctx.body = await addProject({ ...data });
});

router.post("/getAllProject", checkToken, async (ctx, next) => {
  console.log(ctx.request.userInfo);

  ctx.body = await getProject(ctx.request.userInfo.AuthId);
});

module.exports = router;
