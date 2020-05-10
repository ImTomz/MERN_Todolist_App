const express = require("express");
const mongoose = require("mongoose");
const todosRoute = require("./routes/todo");
const cors = require("cors");
require("dotenv/config");

const server = express();

server.use(cors());

server.use(express.urlencoded({ extended: true }));
server.use(express.json());

server.use("/", todosRoute);

mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("connected to DB");
  }
);

server.listen(5000);
