const { errorResponse, successResponse } = require("../utils/responseHandler");
const userService = require("../services/user");
const { validationResult } = require("express-validator");

const login = async (req, res) => {
  const { errors } = validationResult(req);
  if (errors.length) errorResponse(res, "login failed", errors);
  else {
    try {
      const data = await userService.login(req, res);
      successResponse(res, "login successfull", data);
    } catch (error) {
      errorResponse(res, "login failed", error);
    }
  }
};

const register = async (req, res) => {
  const { errors } = validationResult(req);
  if (errors.length) errorResponse(res, "registration failed", errors);
  else {
    try {
      const data = await userService.register(req);
      successResponse(res, "registration successfull", data, 201);
    } catch (error) {
      errorResponse(res, "registration failed", error);
    }
  }
};

const deactivate = async (req) => {
  try {
    const data = await userService.deactivate(req);
    successResponse(res, "user deactivated successfully", data);
  } catch (error) {
    errorResponse(res, "user deactivation failed", error);
  }
};

const fetchList = async (req, res) => {
  try {
    const data = await userService.fetchList(req);
    successResponse(res, "users fetched successfully", data);
  } catch (error) {
    errorResponse(res, "error fetching users", error);
  }
};

const logout = (req, res) => {};

const fetchUser = (req, res) => {};

module.exports = {
  login,
  register,
  deactivate,
  logout,
  fetchUser,
  fetchList,
};
