const express = require("express");

const router = express.Router();

// Import User Controller
const userController = require("../controllers/user");

//Import Validators
const UserValidator = require("../validators/user");

//Import Middlewares
const authenticate = require("../middleware/authenticate");

// GET: /user
router.get("/", userController.fetchList);
// POST: /user
router.post("/register", UserValidator.register, userController.register);
// POST: /user/login
router.post("/login", UserValidator.login, userController.login);
// DELETE :/user/deactivate
router.delete("/deactivate", authenticate, userController.deactivate);

module.exports = router;
