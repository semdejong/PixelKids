const express = require("express");

const router = express.Router();

const { authenticate } = require("./middleware/authenticate");
const { authorize } = require("./middleware/authorize");
const { paginatedResults } = require("./middleware/paginate");
const { User } = require("../models/user");

router.get(
  "/",
  authenticate(),
  paginatedResults(User, "roles"),
  authorize("admin"),
  async (req, res) => {
    const users = res.paginatedResults.results;
    if (!req.authorized) {
      const usersToReturn = users.map((user) => {
        return {
          id: user._id,
          username: user.username,
        };
      });
      return res.status(200).json({
        nextPage: res.paginatedResults.next,
        previousPage: res.paginatedResults.previous,
        users: usersToReturn,
      });
    }
    res.status(200).json({
      amount: res.paginatedResults.amount,
      nextPage: res.paginatedResults.next,
      previousPage: res.paginatedResults.previous,
      users: users.map((user) => {
        return { ...user._doc, password: "" };
      }),
    });
  }
);

router.get("/:id", authenticate(), authorize("admin"), async (req, res) => {
  try {
    if (req.params.id === "0" || req.params.id === req.user._id) {
      return res.status(200).json({
        message: "Succesfully got user",
        username: req.user.username,
        fullname: req.user.fullname,
        email: req.user.email,
        roles: req.user.roles,
      });
    }

    if (!req.authorize)
      return res.status(403).json({
        message: "You do not have permission to access this users information",
      });

    const user = await User.findOne({ _id: req.params.id });

    if (!user)
      return res.status(400).json({ message: "This user does not exist" });

    return res.status(200).json({
      message: "Succesfully got user",
      username: user.username,
      fullname: user.fullname,
      email: user.email,
      roles: user.roles,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.patch("/:id", authenticate(), authorize("admin"), async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (user._id === req.user._id || req.authorized) {
      if (!user) return res.status(400).json({ message: "User not found" });
      if (req.body.username) user.username = req.body.username;
      if (req.body.fullname) user.fullname = req.body.fullname;
      if (req.body.email) user.email = req.body.email;
      if (req.body.roles) {
        if (req.body.roles.length > 0) {
          if (req.body.roles.includes("admin")) {
            user.isAdmin = true;
            user.roles = req.body.roles.filter((role) => role !== "admin");
          } else {
            user.isAdmin = false;
            user.roles = req.body.roles;
          }
        }
      }
      await user.save();
      user.password = "";
      return res.status(200).json(user);
    } else {
      return res
        .status(403)
        .json({ message: "You do not have permission to change this user" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});
module.exports = router;
