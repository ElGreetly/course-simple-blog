const jwt = require("jsonwebtoken");

module.exports.getSessionToken = (data) =>
  jwt.sign(data, process.env.JWT_SECRET);

module.exports.verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return false;
  }
};
