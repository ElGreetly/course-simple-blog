module.exports = (app) => {
  const users = [];

  app.post("/register", (req, res) => {
    /**
     * name
     * email
     * password
     */
    const { body } = req;
    users.push(body);

    res.json(body);
  });
  app.post("/login", (req, res) => {});
  app.get("/me", (req, res) => {});
  return app;
};
