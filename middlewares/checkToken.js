/**
 * @description 获取token信息的中间件
 * @author me
 * */

const jwt = require("jsonwebtoken");

const { jwtSecret } = require("../config/secret");

const util = require("util");
const { ErrorModel } = require("../db/model/ResModel");
const { tokenFailInfo } = require("../db/model/ErrorInfo");
const verify = util.promisify(jwt.verify);

/**
 * 验证token
 * @param{Object} ctx
 * @param{function} next
 * */
async function checkToken(ctx, next) {
  const token = ctx.header.authorization;
  console.log(1111);
  try {
    if (token) {
      let data = await verify(token.split(" ")[1], jwtSecret);
      ctx.request["userInfo"] = data.data;
    }
  } catch (e) {
    console.log(e, e.stack);
    return (ctx.body = new ErrorModel(tokenFailInfo));
  }
  await next();
}

module.exports = checkToken;
