require("dotenv").config();

const express = require("express");

const cors = require("cors");
const routes = require("./src/routes");

require("./src/database");

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

const port = process.env.PORT || 3000;

app.listen(port);
