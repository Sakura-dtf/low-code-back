const { Auth, Project } = require("../db/model/index.js");

async function createRole({ roleName, identificat }) {
  let data = { roleName, identificat };

  const result = await Auth.create(data);

  if (result) {
    return result.dataValues;
  }

  return result;
}

async function findOneRole({ id }) {
  let result = await Auth.findOne({
    where: {
      id,
    },
  });

  if (result) {
    return result.dataValues;
  }

  return result;
}

async function addProject({ authId, projectId }) {
  const res = await findOneRole({ id: authId });
  let project = [];
  if (res.project) {
    project.push(...JSON.parse(JSON.stringify(res.project)), ...projectId);
  } else {
    project.push(...projectId);
  }
  console.log(res, typeof projectId, project);
  if (res) {
    console.log(1, authId, JSON.stringify(project));
    const result = await Auth.update(
      {
        project: JSON.stringify(project),
      },
      {
        where: {
          id: authId,
        },
      }
    );
    console.log(result, 111);
    if (result) {
      return result.dataValues;
    } else {
      return result;
    }
  }
  return null;
}

async function findAllAuthByProjectId({ projectId }) {
  const res = await Project.findOne({
    where: {
      id: projectId,
    },
  });

  if (res) {
    let authId = res.dataValues.auth.split(" ");

    const result = await Auth.findAll({
      where: {
        id: authId,
      },
    });
    console.log(result);
    return result;
  }

  return res;
}

module.exports = {
  createRole,
  findOneRole,
  addProject,
  findAllAuthByProjectId,
};
