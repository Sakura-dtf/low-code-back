const { Op: Op } = require("sequelize");
const { User } = require("../db/model/index.js");
const doCrypto = require("../utils/md5.js");

async function createUser({ username, password, auth, avatar }) {
  let data = { username, password: doCrypto(password) };

  if (avatar) {
    data.avatar = avatar;
  }

  if (auth) {
    data.auth = auth;
  }

  const result = await User.create(data);

  console.log(result);

  if (result) {
    return result.dataValues;
  }

  return result;
}

async function findOneUser({ username, password }) {
  let result = await User.findOne({
    where: {
      username,
      password: doCrypto(password),
    },
  });

  if (result) {
    return result.dataValues;
  }

  return result;
}

async function getAllUserByAuthId({ AuthId }) {
  console.log(AuthId);
  const result = await User.findAll({
    where: {
      AuthId: {
        [Op.or]: AuthId,
      },
    },
  });
  console.log(result);
  return result;
}

async function loginService({ username, password }) {
  let data = await findOneUser({ username, password });

  return { data };
}

async function userSetAuth({ userId, authId }) {
  let res = await User.update(
    {
      AuthId: authId,
    },
    {
      where: {
        id: userId,
      },
    }
  );
  console.log(res);
  return res;
}

module.exports = {
  findOneUser,
  loginService,
  createUser,
  userSetAuth,
  getAllUserByAuthId,
};
