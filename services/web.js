/**
 * @description webConfig services
 * @author me
 * */

const { WebConfig } = require("../db/model/index");

/**
 * @param{Object} low-code对象 index username
 * */

async function createWebConfig({ label, lowCodeData }) {
  console.log(label);
  const result = await WebConfig.create({
    label,
    ...lowCodeData,
  });
  return result;
}

async function findWebConfigByIndex({ id }) {
  const result = await WebConfig.findOne({
    where: {
      id,
    },
  });
  return result;
}

module.exports = {
  createWebConfig,
  findWebConfigByIndex,
};
