const { getSessionToken } = require("../utils/jwt");
const { resolveToken } = require("../utils/tokenMiddleware");

module.exports = (app, db) => {
  const users = db.collection("users");

  app.post("/register", async (req, res) => {
    const { body } = req;
    if (!body.username || !body.password || !body.name) {
      return res.status(400).json({ error: { message: "Validation Error" } });
    }
    const { insertedId } = await users.insertOne(body);
    token = getSessionToken({ id: insertedId });
    res.json({ id: insertedId, token });
  });

  app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const user = await users.findOne({ username, password });

    if (!user) return res.status(403).end();
    user.token = getSessionToken({ id: user._id });
    res.json(user);
  });

  app.get("/me", resolveToken(db), (req, res) => res.json(req.user));
  return app;
};
