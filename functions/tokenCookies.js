const jwt = require("jsonwebtoken");
const secret = process.env.TOKEN_SECRET;
// JWT TOKENS FOR USER VERIFICATIONS

// OPTIONS

const options = {
  algorithm: "HS256",
  expiresIn: '3h',

};

// SIGNATURE

const createToken = (payload) => {
  return jwt.sign(payload, secret, options);
};

const verifyToken = (token) => {
  if (!token) {
    let error = new Error("token not provided");
    return { valid: false, error: error };
  }

  return jwt.verify(token, secret, (error, payload) => {
    if (error) return { valid: false, error: error };
    return { valid: true, payload: payload };
  });
};


module.exports = { createToken, verifyToken };
