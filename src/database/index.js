const Neode = require("neode");

const instance = new Neode(
  process.env.URI_DATABASE,
  process.env.USERNAME_DATABASE,
  process.env.PASSWORD_DATABASE
);

module.exports = instance;
