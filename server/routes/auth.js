require("dotenv").config();

const express = require("express");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");

const { User, validate } = require("../models/user");
const Session = require("../models/Session");

const router = express.Router();

router.post("/register", async (req, res) => {
  //Email is the unique identifier for the user
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists)
    return res.status(403).json({ message: "This email already exists." });

  //Validate the user data
  const { error } = validate(req.body);
  if (error) return res.status(403).json({ message: error.details[0].message });

  //Hash the password using bcrypt https://www.npmjs.com/package/bcryptjs
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  try {
    //Create a new user based on the model and save it to the database
    const uploadedUser = await new User({
      fullname: req.body.fullname,
      email: req.body.email,
      password: hashedPassword,
    }).save();

    //Return the user without a password and with a success code
    return res.status(200).json({ ...uploadedUser, password: "" });
  } catch (err) {
    //Return an error if the user could not be created
    return res.status(500).json({ message: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    //Find the user with the email and return early if not found
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res
        .status(403)
        .json({ message: "These credentials are not valid." });

    //Check if the password is correct for the user with the given email, return early if not
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res
        .status(403)
        .json({ message: "These credentials are not valid." });

    //Deleting the old session for the user
    await Session.findOneAndDelete({ user: user._id });

    //Create a new session for the user based on a uuid
    const sessionToken = uuidv4();

    //Create a new session for the user based on the model and saving it to the database
    const uploadedSession = await new Session({
      user: user._id,
      sessionToken: sessionToken,
    }).save();

    //TODO: implement 2fa

    //Calculating the expiration date for the session (24hrs)
    const expireDate = new Date(new Date().getTime() + 24 * 60 * 60000);

    //Adding a cookie to the response with the sessionToken
    res.cookie("session", sessionToken, {
      sameSite: "strict",
      path: "/",
      expires: expireDate,
      httpOnly: true,
    });

    //Returning the response obj with a success code
    return res
      .status(200)
      .json({
        message: "Session cookie has been set.",
        expiryDate: expireDate,
        username: user.username,
        fullname: user.fullname,
        roles: user.roles,
      })
      .send();
  } catch (err) {
    //Return an error if the user could not be logged in
    return res.status(500).json({ message: err.message });
  }
});

router.get("/logout", async (req, res) => {
  //Getting the cookie from the request (httpCookies)
  const cookie = req.cookies.session;

  //Deleting the cookie from the response object
  res.clearCookie("session");

  try {
    //Deleting the session from the database
    await Session.findOneAndDelete({ sessionToken: cookie });
  } catch (err) {
    //Return an error if the session could not be deleted
  }
  //Returning a succes message with its respective code
  return res.status(200).json({ message: "You have successfully logged out" });
});

module.exports = router;
