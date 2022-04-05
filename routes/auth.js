const router = require("koa-router")();
const {
  addRole,
  authAddProject,
  GetAllAuthByProjectId,
} = require("../controller/auth");

router.prefix("/auth");

router.post("/addRole", async (ctx, next) => {
  let data = {
    roleName: ctx.request.body.roleName,
    identificat: ctx.request.body.identificat,
  };
  if (ctx.request.body.projectId) {
    data.projectId = ctx.request.body.projectId;
  }
  ctx.body = await addRole({ ...data });
});

router.post("/GetAllAuthByProjectId", async (ctx) => {
  const { projectId } = ctx.request.body;

  ctx.body = await GetAllAuthByProjectId({ projectId });
});

router.post("/addProject", async (ctx) => {
  const { authId, projectId } = ctx.request.body;
  let data = { authId };
  if (projectId && JSON.parse(projectId).length) {
    try {
      data.projectId = JSON.parse(projectId);
    } catch (error) {
      data.projectId = eval(projectId);
    }

    ctx.body = await authAddProject(data);
  } else {
    ctx.body = {
      message: "你没有选择项目",
    };
  }
});

module.exports = router;
