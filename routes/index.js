const router = require("koa-router")();

const {
  addLowCodeData,
  searchOneLowCodeData,
} = require("../controller/web.js");

router.post("/saveConfig", async (ctx, next) => {
  console.log(ctx.request.body);
  ctx.body = await addLowCodeData({
    label: ctx.request.body.label,
    lowCodeData: ctx.request.body.lowCodeData,
  });
});

router.post("/getConfig", async (ctx, next) => {
  console.log(ctx.request.body);
  ctx.body = await searchOneLowCodeData({ id: ctx.request.body.id });
});

module.exports = router;
