const { body } = require("express-validator");
const User = require("../models/user");

const register = [
  body("first_name")
    .notEmpty()
    .withMessage("first name cannot be empty")
    .isLength({ min: 3 })
    .withMessage("first name must be 3 char long"),
  body("last_name")
    .notEmpty()
    .withMessage("last name cannot be empty")
    .isLength({ min: 3 })
    .withMessage("last name must be 3 char long"),
  body("email")
    .notEmpty()
    .withMessage("email cannot be empty")
    .isEmail()
    .withMessage("invalid email")
    .custom(async (email) => {
      try {
        const user = await User.findOne({ where: { email } });
        if (user) return new Promise.reject();
      } catch (error) {
        return new Promise.reject();
      }
    })
    .withMessage("email already exists"),
  body("password")
    .notEmpty()
    .withMessage("password cannot be empty")
    .isLength({ min: 4 })
    .withMessage("password must be 4 char long"),
];

const login = [
  body("email")
    .notEmpty()
    .withMessage("email cannot be empty")
    .isEmail()
    .withMessage("invalid email"),
  body("password")
    .notEmpty()
    .withMessage("password cannot be empty")
    .isLength({ min: 4 })
    .withMessage("password must be 4 char long"),
];

module.exports = { login, register };
