const express = require("express");
const router = require("./routes");
const morgan = require("morgan");
const cors = require("cors");
const apiRes = require('./utils/data/apiData');

const server = express();

server.use(morgan("dev"));
server.use(express.json());
server.use(cors());

server.use(router);

module.exports = server;
