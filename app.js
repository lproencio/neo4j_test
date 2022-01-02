require("dotenv").config();

const express = require("express");
const path = require("path");

const cors = require("cors");
const routes = require("./src/routes");

require("./src/database");

const app = express();

app.use(express.static(path.join(__dirname, "./dist")));

app.use(cors());
app.use(express.json());
app.use(routes);

const port = process.env.PORT || 3000;

app.listen(port);
