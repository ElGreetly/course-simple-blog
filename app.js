const express = require("express");
const db = require("./utils/db");
const { resolveToken } = require("./utils/tokenMiddleware");

db.set();

const users = require("./controllers/users");
const posts = require("./controllers/posts");

const app = express();
const { Router } = express;

app.use(express.json());

app.use("/users", users(new Router()));
app.use("/posts", resolveToken, posts(new Router()));

module.exports = app;
