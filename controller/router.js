const { createRouter, findAllRouter } = require("../services/router");
const { SuccessModel, ErrorModel } = require("../db/model/ResModel");
const { addRouterFail, getRouterFail } = require("../db/model/ErrorInfo");

async function addRouter({
  name,
  path,
  auth,
  icon,
  type,
  fatherId,
  projectId,
  webConfigId,
}) {
  const result = await {
    name,
    path,
    auth,
    icon,
    type,
    fatherId,
    projectId,
    webConfigId,
  };
  try {
    const res = await createRouter({
      name,
      path,
      auth,
      icon,
      type,
      fatherId,
      projectId,
      webConfigId,
    });
    if (result) {
      return new SuccessModel({
        message: "创建路由菜单成功",
      });
    }
  } catch (e) {
    return new ErrorModel(addRouterFail);
  }
}

async function getRouterByAuthByProject({ auth, projectId }) {
  const res = await findAllRouter({ projectId });
  if (res) {
    let data = [],
      obj = {},
      i = 0;
    res.forEach((item, index) => {
      if (!item.dataValues.fatherId) {
        if (
          (item.dataValues.auth + " ").indexOf(auth + " ") > -1 ||
          auth == 1
        ) {
          data.push(item.dataValues);
          obj[item.dataValues.id] = data[i];
          i++;
        }
      }
    });
    console.log(data, 111);
    res.forEach((item) => {
      if (item.dataValues.fatherId) {
        if (obj[item.dataValues.fatherId]) {
          if (!obj[item.dataValues.fatherId].children) {
            obj[item.dataValues.fatherId].children = [];
          }
          obj[item.dataValues.fatherId].children.push(item.dataValues);
        }
      }
    });
    console.log(data);
    if (data.length) {
      return new SuccessModel({
        data,
        message: "查询成功",
      });
    } else {
      return new ErrorModel(getRouterFail);
    }
  } else {
    return new ErrorModel(getRouterFail);
  }
}
module.exports = {
  addRouter,
  getRouterByAuthByProject,
};
