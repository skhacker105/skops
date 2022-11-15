const helper = require("../helper");
const jwt = require("jsonwebtoken");
const config = process.env;

const verifyToken = (req, res, next) => {
  const token = helper.getToken(req);

  if (!token) {
    return res.status(403).json({ message: "A token is required for authentication" });
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).json({ message: "Invalid Token" });
  }
  return next();
};

module.exports = verifyToken;