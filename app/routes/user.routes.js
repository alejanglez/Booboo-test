module.exports = (app) => {
  const Users = require("../controllers/user.controller.js");

  var router = require("express").Router();

  // first step one time password
  router.post("/first", Users.first);

  // second step one time password
  router.post("/second", Users.second);

  // Signup new User
  router.post("/signup", Users.signup);

  // Log in new User
  router.post("/login", Users.login);

  // update User
  router.put("/:id", Users.update);

  // Delete User
  router.delete("/:id", Users.delete);

  app.use("/api/users", router);
};
