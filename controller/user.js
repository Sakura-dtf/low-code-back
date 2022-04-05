const {
  loginService,
  createUser,
  userSetAuth,
  getAllUserByAuthId,
} = require("../services/user");
const { findOneProject } = require("../services/project.js");
const { SuccessModel, ErrorModel } = require("../db/model/ResModel");
const { loginFail, addRoleFail } = require("../db/model/ErrorInfo");

const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/secret");
const svgCaptcha = require("svg-captcha");

async function login({ username, password, project, captcha }) {
  let data = await loginService({ username, password, project });
  console.log(data);
  if (data.data) {
    const token = jwt.sign(data, jwtSecret, { expiresIn: "2h" });

    return new SuccessModel({
      message: "登录成功",
      data: {
        token,
      },
    });
  } else {
    return new ErrorModel(loginFail);
  }
}

async function register({ username, password }) {
  const result = await createUser({ username, password });
  return new SuccessModel({
    message: "创建用户成功",
  });
}

async function setUserAuth({ userId, authId }) {
  try {
    const res = await userSetAuth({ userId, authId });
    return new SuccessModel({
      message: "分配角色成功",
    });
  } catch (error) {
    return new ErrorModel(addRoleFail);
  }
}

async function getProjectAllUser(projectId) {
  const project = await findOneProject({ id: projectId });
  if (project) {
    console.log(project.auth);
    if (project.auth) {
      const result = await getAllUserByAuthId({
        AuthId: project.auth.split(" "),
      });
      if (result) {
        return new SuccessModel({
          data: result,
          message: "获取数据成功",
        });
      }
    }
  } else {
    // 错误处理
  }
}

function createCode() {
  return svgCaptcha.create({
    size: 4, //验证码个数
    width: 160, //宽
    height: 60, //高
    fontSize: 50, //验证码字体大小
    ignoreChars: "0oO1ilI", // 验证码字符中排除 0o1i
    noise: 2, //干扰线条的数量
    color: true, //验证码的字符是否有颜色，默认没有，如果设定了背景，则默认有
    background: "#eee", // 验证码图片背景颜色
  });
}

module.exports = {
  login,
  register,
  createCode,
  setUserAuth,
  getProjectAllUser,
};
