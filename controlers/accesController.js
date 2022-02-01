const { createToken, verifyToken } = require("../functions/tokenCookies");

function sendTokenToUser(req, res, next) {
  const token = createToken(res.user);

  try {
    res.cookie("token", token, {
      maxAge: process.env.TOKEN_EXPIRATION * 10,
      httpOnly: true,
    });
    next();
  } catch (err) {
    next(err);
  }
}

function checkToken(req, res, next) {
  const token = req.cookies.token;
  const payload = verifyToken(token);
  try {
    if (!token) return res.status(401).json("Please logIn/signIn");
    if (!payload)
      return res.status(401).json("Please log in, your session has expired");

    res.user = {
      username: payload.username,
      email: payload.email,
      role: payload.role,
    };

    next();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  sendTokenToUser,
  checkToken,
};
