const { createToken, verifyToken } = require("../functions/tokenCookies");
const tokenExpiration = process.env.TOKEN_EXPIRATION;

function sendTokenToUser(req, res, next) {
  const token = createToken(res.user);

  console.log('the token made from the user info we passed on(encrypted): ' , token);

  try {
    res.cookie("token", token);
    next();
  } catch (err) {
    next(err);
  }
}

function checkToken(req, res, next) {
  const token = req.cookies.token;
  const payload = verifyToken(token);

  console.log(payload.payload.role);
  try {
    if (!token) return res.status(401).json("Please logIn/signIn");
    if (!payload)
      return res.status(401).json("Please log in, your session has expired");

      res.user ={
        role: payload.payload.role
      }
  

  
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  sendTokenToUser,
  checkToken,
};
