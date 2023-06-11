const express = require("express");
const router = require("./routes");
const morgan = require("morgan");
const cors = require("cors");
const session = require('express-session');

const server = express();
server.use(morgan("dev"));
server.use(express.json());
server.use(cors());
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
  });

  
server.use(session({
  secret: 'secreto', // Cambia esto por una cadena de caracteres aleatoria y segura
  resave: false,
  saveUninitialized: false,
}));

server.use(router);

module.exports = server;
