const jwt = require("jsonwebtoken");
require("dotenv").config();

const signJwt = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

const verifyJwt = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = { verifyJwt, signJwt };
