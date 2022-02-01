const jwt = require("jsonwebtoken");

// JWT TOKENS FOR USER VERIFICATIONS

// ALGORITHM

const algorithm = "HS256";

// SIGNATURE

const privateKey = process.env.SECRET;

const createToken = (payload) => {
  return jwt.sign(payload, process.env.TOKEN_SECRET, {
    algorithm,
    expiresIn: `${process.env.TOKEN_EXPIRATION}s`,
  });
};

const verifyToken = (token) => {
  return jwt.verify(
    token,
    process.env.TOKEN_SECRET,
    { algorithms: [algorithm] },
    (error, payload) => {
      if (error) return null;
      return payload;
    }
  );
};


module.exports = { createToken, verifyToken };
