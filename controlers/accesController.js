const { createToken, verifyToken } = require("../functions/tokenCookies");
const tokenExpiration = process.env.TOKEN_EXPIRATION;

function sendTokenToUser(req, res, next) {
  const token = createToken(res.user);

  try {
    res.cookie("token", token);
    next();
  } catch (err) {
    next(err);
  }
}

function checkToken(req, res, next) {
  console.log(req.cookies.token);
  const token = req.cookies.token;
  const payload = verifyToken(token);
  try {
    if (!token) return res.status(401).json("Please logIn/signIn");
    if (!payload)
      return res.status(401).json("Please log in, your session has expired");

    next();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  sendTokenToUser,
  checkToken,
};
