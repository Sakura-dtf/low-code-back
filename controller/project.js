const {
  createProject,
  findOneProject,
  findAllProject,
  setProjectAuth,
} = require("../services/project");
const { SuccessModel, ErrorModel } = require("../db/model/ResModel");
const { projectCreateFail, setProjectFail } = require("../db/model/ErrorInfo");

async function addProject({ name, role, type }) {
  try {
    const result = await createProject({ name, role: role.join(" "), type });
    if (result) {
      return new SuccessModel({
        message: "创建项目成功",
      });
    }
  } catch (error) {
    return new ErrorModel(projectCreateFail);
  }
}

async function getProject(role) {
  const result = await findAllProject();
  console.log(role, result);
  let data = [];
  if (role !== 1) {
    result.forEach((item) => {
      if (item.dataValues.auth && item.dataValues.auth.indexOf(role) > -1) {
        data.push({ id: item.dataValues.id, name: item.dataValues.name });
      }
    });
  } else {
    data = result;
  }

  return new SuccessModel({
    data: data,
    message: "获取项目成功",
  });
}

async function addProjectAuth({ auth, projectId }) {
  console.log(auth, projectId);
  const res = await findOneProject({ id: projectId });
  if (res) {
    console.log(res);
    res.auth = res.auth + " " + auth;
    console.log(res.auth);
    try {
      let data = await setProjectAuth({ projectId, auth: res.auth });
      return new SuccessModel({
        message: "添加成功",
      });
    } catch (error) {
      return new ErrorModel(setProjectFail);
    }
  } else {
    return new ErrorModel(setProjectFail);
  }
}

module.exports = {
  addProject,
  getProject,
  addProjectAuth,
};
