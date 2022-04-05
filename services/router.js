const { Router } = require("../db/model/index.js");
const { Op: Op } = require("sequelize");

async function createRouter({
  name,
  path,
  auth,
  icon,
  type,
  fatherId,
  projectId,
  webConfigId,
}) {
  let data = { name, auth, type, ProjectId: projectId };
  if (path) {
    data.path = path;
  }
  if (icon) {
    data.icon = icon;
  }
  if (fatherId) {
    data.fatherId = fatherId;
  }
  if (webConfigId) {
    data.webConfigId = webConfigId;
  }

  const result = await Router.create(data);
  console.log(result);

  if (result) {
    return result.dataValues;
  }

  return result;
}

async function findAllRouter({ name, path, fatherId, projectId }) {
  let where = {};
  if (name) {
    where.name = {
      [Op.like]: `%${name}%`,
    };
  }
  if (path) {
    where.path = {
      [Op.like]: `%${path}%`,
    };
  }
  if (fatherId) {
    where.fatherId = fatherId;
  }

  if (projectId) {
    where.ProjectId = projectId;
  }

  const result = Router.findAll({
    where,
  });
  return result;
}
module.exports = {
  createRouter,
  findAllRouter,
};
