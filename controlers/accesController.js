const {createToken} = require('../functions/tokenCookies')

function sendTokenToUser (req, res, next) {
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
};


module.exports = {
    sendTokenToUser
}