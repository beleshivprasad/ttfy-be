const { verifyToken } = require("../auth/jwt");
const { JWT_SECRET } = require("../config/env");
const User = require("../models/user");
const { errorResponse } = require("../utils/responseHandler");

const authenticate = async (req, res, next) => {
  if (req.headers && req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];

    try {
      const payload = verifyToken(token, JWT_SECRET);
      const { id, email } = payload;
      const user = await User.findOne({ where: { id, email } });

      if (!user) throw "no active user found";
      req.user = payload;

      next();
    } catch (error) {
      errorResponse(res, "failed to authenticate", error, 401);
    }
  } else {
    errorResponse(res, "failed to authenticate", "no access token found", 401);
  }
};

module.exports = authenticate;
