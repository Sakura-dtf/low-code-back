/**
 * @description web controller
 * @author me
 * */

const { createWebConfig, findWebConfigByIndex } = require("../services/web.js");

const { SuccessModel, ErrorModel } = require("../db/model/ResModel");

const { createWebConfigFail } = require("../db/model/ErrorInfo");

/**
 * 添加用户文章
 * @param{Object} 文章对象
 * */
async function addLowCodeData({ lowCodeData, label }) {
  try {
    const result = await createWebConfig({
      label,
      lowCodeData,
    });
    console.log(result);
    return new SuccessModel({
      message: "保存数据成功",
    });
  } catch (e) {
    console.log(e);
    return new ErrorModel(createWebConfigFail);
  }
}

async function searchOneLowCodeData({ id }) {
  const result = await findWebConfigByIndex({ id });

  if (result) {
    return new SuccessModel({
      message: "查询数据成功",
      data: result,
    });
  } else {
    return new ErrorModel(searchWebConfigFail);
  }
}

module.exports = {
  addLowCodeData,
  searchOneLowCodeData,
};
