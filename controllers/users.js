const { getSessionToken } = require("../utils/jwt");
const { resolveToken } = require("../utils/tokenMiddleware");

module.exports = (app, db) => {
  app.post("/register", async (req, res) => {
    const { name, username, password, birth } = req.body;
    if (!username || !password || !name || !birth) {
      return res.status(400).json({ error: { message: "Validation Error" } });
    }
    const {
      rows: [user],
    } = await db.query(
      `INSERT INTO users ("name", "username", "password", "birth") VALUES ('${name}', '${username}', '${password}', '${birth}') RETURNING id`
    );
    token = getSessionToken({ id: user.id });
    res.json({ id: user.id, token });
  });

  app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const {
      rows: [user],
    } = await db.query(
      `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`
    );

    if (!user) return res.status(403).end();
    user.token = getSessionToken({ id: user.id });
    res.json(user);
  });

  app.get("/me", resolveToken(db), (req, res) => res.json(req.user));
  return app;
};
