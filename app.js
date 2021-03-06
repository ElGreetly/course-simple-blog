const express = require("express");
const mongoClient = require("./utils/db");
const { resolveToken } = require("./utils/tokenMiddleware");

const users = require("./controllers/users");
const posts = require("./controllers/posts");

const app = express();
const { Router } = express;

app.use(express.json());

async function run() {
  const db = await mongoClient().then((client) => client.db("blog"));
  app.use("/users", users(new Router(), db));
  app.use("/posts", resolveToken(db), posts(new Router(), db));
}
run();

module.exports = app;
