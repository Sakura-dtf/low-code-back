const { Project } = require("../db/model/index.js");

async function createProject({ name, role, type }) {
  let data = { name };
  if (role) {
    data.auth = role;
  }
  if (type) {
    data.type = type;
  }
  const result = await Project.create(data);

  if (result) {
    return result.dataValues;
  }

  return result;
}

async function findOneProject({ id }) {
  let result = await Project.findOne({
    attributes: ["id", "name", "auth"],
    where: {
      id,
    },
  });

  if (result) {
    return result.dataValues;
  }

  return result;
}

async function findAllProject() {
  let result = await Project.findAll({
    attributes: ["id", "name", "auth", "type"],
  });
  return result;
}

async function setProjectAuth({ projectId, auth }) {
  let res = await Project.update(
    {
      auth,
    },
    {
      where: {
        id: projectId,
      },
    }
  );

  return res;
}

module.exports = {
  createProject,
  findOneProject,
  findAllProject,
  setProjectAuth,
};
