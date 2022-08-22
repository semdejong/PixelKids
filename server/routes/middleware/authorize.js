function authorize(role, earlyReturn = false) {
  return async (req, res, next) => {
    if (req?.user?.roles?.includes(role) || req?.user?.isAdmin) {
      req.authorized = true;
    } else {
      req.authorized = false;
      if (earlyReturn) {
        res.status(403).json({
          message: "You do not have permission to access this resource",
        });
      }
    }
    next();
  };
}

module.exports = {
  authorize,
};
