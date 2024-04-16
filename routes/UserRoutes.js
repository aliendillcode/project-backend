const router = require("express").Router();

const UserController = require("../controllers/UserController");

router.get("/users/login", UserController.login);

router.post("/users/register", UserController.register);

module.exports = router;
