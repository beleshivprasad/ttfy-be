const User = require("../models/user");
const { generateToken } = require("../auth/jwt");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");

const register = async (req) => {
  const { first_name, last_name, email, password } = req.body;
  try {
    const res = await User.create({ first_name, last_name, email, password });

    return {
      id: res.id,
      first_name: res.first_name,
      last_name: res.last_name,
      email: res.email,
    };
  } catch (error) {
    throw error.message || error;
  }
};

const login = async (req) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) throw "email is not registered";
    if (!user.hasValidPassword(password)) throw "wrong password";

    return {
      token: generateToken({ id: user.id, email: user.email }),
    };
  } catch (error) {
    throw error.message || error;
  }
};

const deactivate = async (req) => {
  try {
    const { id, email } = req.user;
    const user = User.findAll({ where: { id, email } });
    if (!user) throw "no user exists";
    await User.destroy({ where: { id } });

    return user;
  } catch (error) {
    throw error.message || error;
  }
};

const fetchList = async (req) => {
  try {
    let { search_key } = req.body;
    if (!search_key) search_key = "";
    console.log(search_key);
    const users = await User.findAll({
      attributes: {
        exclude: ["password", "updatedAt", "createdAt"],
      },
      where: {
        [Op.or]: [
          { first_name: { [Op.like]: `%${search_key}%` } },
          { last_name: { [Op.like]: `%${search_key}%` } },
        ],
      },
    });

    return users;
  } catch (error) {
    throw error.message || error;
  }
};

module.exports = { register, login, deactivate, fetchList };
