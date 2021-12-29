require("dotenv").config();

const express = require("express");

const app = express();
const cors = require("cors");

require("./src/database");

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;

app.listen(port);
