const router = require("koa-router")();
const { addRouter, getRouterByAuthByProject } = require("../controller/router");
const checkToken = require("../middlewares/checkToken");

router.prefix("/router");

router.post("/addRouter", async (ctx, next) => {
  let { name, auth, type, projectId } = ctx.request.body;
  let path, fatherId, icon;
  if (ctx.request.body.path) {
    path = ctx.request.body.path;
  }

  if (ctx.request.body.fatherId) {
    fatherId = ctx.request.body.fatherId;
  }

  if (ctx.request.body.icon) {
    icon = ctx.request.body.icon;
  }

  ctx.body = await addRouter({
    name,
    auth,
    type,
    projectId,
    path,
    fatherId,
    icon,
  });
});

router.post("/getAllRouterByAuthByProject", checkToken, async (ctx, next) => {
  let { projectId } = ctx.request.body;
  let { AuthId: auth } = ctx.request.userInfo;

  ctx.body = await getRouterByAuthByProject({ auth, projectId });
});

module.exports = router;
