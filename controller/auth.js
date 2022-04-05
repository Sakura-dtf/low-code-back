const {
  createRole,
  findOneRole,
  addProject,
  findAllAuthByProjectId,
} = require("../services/auth");
const { SuccessModel, ErrorModel } = require("../db/model/ResModel");
const {
  authCreateFail,
  addProjectFail,
  setProjectFail,
  getAuthFail,
} = require("../db/model/ErrorInfo");
const { addProjectAuth } = require("./project");
async function addRole({ roleName, projectId, identificat }) {
  try {
    const result = await createRole({ roleName, identificat });

    if (projectId !== undefined) {
      console.log(result);
      let res = await addProjectAuth({ auth: result.id, projectId });

      if (res.errno === 0) {
        return new SuccessModel({
          message: "创建角色成功",
        });
      } else {
        return new ErrorModel(setProjectFail);
      }
    } else {
      return new SuccessModel({
        message: "创建角色成功",
      });
    }
  } catch (error) {
    return new ErrorModel(authCreateFail);
  }
}

async function authAddProject({ projectId, authId }) {
  try {
    const res = await addProject({ projectId, authId });
    if (res) {
      return new SuccessModel({
        message: "分配项目成功",
      });
    } else {
      return new ErrorModel(addProjectFail);
    }
  } catch (error) {
    console.log(error);
    return new ErrorModel(addProjectFail);
  }
}

async function GetAllAuthByProjectId({ projectId }) {
  console.log(111);
  const res = await findAllAuthByProjectId({ projectId });

  if (res) {
    return new SuccessModel({
      message: "查询数据成功",
      data: res,
    });
  } else {
    return new ErrorModel(getAuthFail);
  }
}

module.exports = {
  addRole,
  authAddProject,
  GetAllAuthByProjectId,
};
