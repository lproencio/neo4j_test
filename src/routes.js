const express = require("express");

const UserController = require("./controllers/UserController");

const routes = express.Router();

routes.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./build/index.html"));
});

routes.post("/user", UserController.create);
routes.get("/users", UserController.findAll);
routes.get("/users/:id", UserController.findById);
routes.put("/users/:id", UserController.update);
routes.delete("/users/:id", UserController.delete);

module.exports = routes;
