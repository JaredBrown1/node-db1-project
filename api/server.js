const express = require("express");

const db = require("../data/dbConfig.js");

const AccountRouter = require("../api/accounts-router.js");

const server = express();

server.use(express.json());

server.use("/api/accounts", AccountRouter);

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

module.exports = server;
