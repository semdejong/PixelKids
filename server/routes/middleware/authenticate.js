const Session = require("../../models/Session");
const { User } = require("../../models/User");

function authenticate(earlyReturn = true) {
  return async (req, res, next) => {
    try {
      let sessionToken;

      if (req.cookies.session) {
        sessionToken = req.cookies.session;
      } else {
        const authHeader = req.headers["authorization"];
        sessionToken = authHeader && authHeader.split(" ")[1];
      }
      console.log(sessionToken);
      if (!sessionToken && earlyReturn)
        return res.status(401).json({ message: "Invalid session token. 1" });

      const session = await Session.findOne({ sessionToken: sessionToken });
      if (!session && earlyReturn)
        return res.status(401).json({ message: "Invalid session token. 2" });

      const user = await User.findOne({ _id: session.user });
      if (!user && earlyReturn)
        return res.status(401).json({ message: "Invalid session token. 3" });

      if (user) {
        req.user = user;
      } else {
        req.user = null;
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }

    next();
  };
}

module.exports = {
  authenticate,
};
