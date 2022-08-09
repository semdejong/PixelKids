function authorize(role) {
  return async (req, res, next) => {
    if (req.user.role === role) {
      req.authorized = true;
    } else {
      req.authorized = false;
    }
    next();
  };
}

module.exports = {
  authorize,
};
