const { createToken, verifyToken } = require("../functions/tokenCookies");

function checkAuth(req, res, next) {
  const userToken = req.cookies.token; // unparsed token
  const payload = verifyToken(userToken); //parsed token

  if (!userToken) return res.status(401).json("user not authorized");
  if (!payload) return res.status(401).json("User not authorized");

  // populate the res object with the information of the payload
  res.user = {
    userId: payload.userId,
    name: payload.name,
    role: payload.role,
  };

  res.status(200).cookie('token', createToken(res.user), {
      maxAge: process.env.TOKEN_EXPIRATION,
      httpOnly: true,
  });

  next()
  
}

module.exports = {
  checkAuth,
};
