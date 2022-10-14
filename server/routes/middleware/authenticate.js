const bcrypt = require("bcryptjs");

const Session = require("../../models/Session");
const { User } = require("../../models/user");

function authenticate(earlyReturn = true) {
  return async (req, res, next) => {
    try {
      let sessionToken;

      let APIKey = req.header("APIKey");

      if (req.cookies.session) {
        sessionToken = req.cookies.session;
      } else {
        const authHeader = req.headers["authorization"];
        sessionToken = authHeader && authHeader.split(" ")[1];
      }

      console.log(sessionToken);

      if (!sessionToken && !APIKey && earlyReturn)
        return res.status(401).json({ message: "Invalid session token. 1" });

      let session;
      if (sessionToken) {
        session = await Session.findOne({ sessionToken: sessionToken });
      }

      if (!session & !APIKey && earlyReturn)
        return res.status(401).json({ message: "Invalid session token. 2" });

      let user = await User.findOne({
        _id: session?.user || APIKey?.split("#")[1] || "",
      });

      if (user && APIKey) {
        const validAPIKey = await bcrypt.compare(
          APIKey.split("#")[0],
          user.APIKey
        );
        if (!validAPIKey)
          return res.status(403).json({ message: "This APIKey is not valid." });
      }

      if (!user && earlyReturn)
        return res
          .status(401)
          .json({ message: "Invalid session token or API key. 3" });

      if (user) {
        req.user = user;
      } else {
        req.user = null;
      }
    } catch (err) {
      return res.status(500).json({
        message: "There was something wrong with your session or API key",
      });
    }

    next();
  };
}

module.exports = {
  authenticate,
};
