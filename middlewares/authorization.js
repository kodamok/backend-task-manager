function checkPermissions(role) {
  return function adminPermissionMiddleware(req, res, next) {
    const userTokenPayload = res.user.role; // admin

    if (userTokenPayload !== role)
      return res.status(403).json("You are not authorized");

    next();
  };
}

module.exports = { checkPermissions };
